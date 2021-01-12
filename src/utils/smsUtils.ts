import express from "express";
import { getRandomNumber } from "./commons/utils";
import { redis } from "./redis";
import resp from "./resp/resp";
import { validateCaptcha } from "./captchaUtils";
import Errors from "../errors";
import SmsUtils from "./sms";
import Types from "../statics/types";

/**
 * 发送短信验证码。
 * 验证码内容会缓存到Redis，有效期为10分钟。
 */
export async function sendSmsCode(
  fullPhone: string,
  captchaCode: string
): Promise<any> {
  try {
    if (fullPhone == null || fullPhone == "") {
      throw Errors.CommonError.MISSING_PARAM;
    }

    var isCaptchaValid = await validateCaptcha(
      captchaCode,
      fullPhone,
      String(Types.CaptchaCodeActionTypes.sendSms.type)
    );
    if (isCaptchaValid == false) {
      throw Errors.AuthError.INVALID_CAPTCHA;
    }

    var num = getRandomNumber(Number(4));

    var result = await storeSmsCodeInRedis(fullPhone, String(num));

    if (result.toUpperCase() == "OK") {
      /// TODO: send to msm
      /// 接上发短信api
      var msg = "Your code for Cargogo is：" + num;

      var result = await SmsUtils.sendSms(fullPhone, msg);

      if (result) {
        if (result["status"] == "sent" || result["status"] == "queued") {
          /// for test response
          return resp.ok("Message sent!");
        } else {
          return resp.fail(result["errorMessage"], result["errorCode"]);
        }
      }
    }

    return resp.fail();
  } catch (error) {
    throw error;
  }
}

/**
 * 将短信验证内容缓存到 Redis 里，默认有效时间为10分钟
 * @param fullPhone
 * @param smsCode
 * @param duration   [default: 600 seconds]
 */
export async function storeSmsCodeInRedis(
  fullPhone: string,
  smsCode: string,
  duration: number = 600
): Promise<string | any> {
  return await redis.set(fullPhone, smsCode, "ex", duration);
}

export async function validateSmsCode(
  fullPhone: string,
  smsCode: string
): Promise<boolean> {
  if (
    fullPhone == null ||
    fullPhone == "" ||
    smsCode == null ||
    smsCode == ""
  ) {
    return false;
  }

  var result = await redis.get(fullPhone);
  if (result) {
    if (result.toLowerCase() == smsCode.toLowerCase()) {
      redis.del(fullPhone);
      return true;
    }
  }

  return false;
}
