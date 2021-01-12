import express from "express";
import svgCaptcha from "svg-captcha";
import { redis } from "./redis";
import resp from "./resp/resp";
import Types from "../statics/types";
import Errors from "../errors";
import captchapng from "captchapng";
import { getRandomNumber } from "../utils/commons/utils";

// /***
//  * 说明：
//  *      在某些情况下，为了抵抗恶意攻击，一些操作需要验证码进行限制。
//  *      用户获取验证码需要提供两个要素：[id: 谁要申请验证码],[type: 申请验证码的目的行文]
//  *      程序会验证type是否合法，type 的行为定义参考 'file://../statics/captchaCodeActionType.ts'
//  *
//  *      举例：
//  *          1. 用户需要发送手机短信验证码，提交发送短信验证码需通过服务器的图片验证码验证流程。
//  *              这里 [id] 是用户的手机号码，格式是 phoenArea+phone，[例：+16999999999]。
//  *              [type] 是 [captchaCodeActionType] 里定义的，参考文档。
//  *
//  *
//  *      如果用户发来的 [type] 是 [captchaCodeActionType] 里没定义的，则视为非法，获取图片验证码的行为终止。
//  */
// export async function getCaptchaSvg2(id: string, type: string): Promise<any> {
//   try {
//     if (id == null || id == "") {
//       throw Errors.CaptchaError.MISSING_PARAM_ID;
//     }

//     var isTypeValid: boolean = Types.CaptchaCodeActionTypes.isValidType(
//       Number(type)
//     );
//     if (isTypeValid == false) {
//       throw Errors.CaptchaError.INVALID_TYPE;
//     }

//     var captcha = svgCaptcha.createMathExpr({ background: "#34bdeb" });
//     var capcode = captcha.text;

//     if (capcode == null || capcode == "") {
//       throw Errors.CaptchaError.CREATE_CAPTCHA_FAILED;
//     }

//     var result: string = await storeCaptchaInfoToRedis(capcode, id, type, 600); ///验证码有效时间为10分钟
//     // console.log("redis result: " + result);
//     if (result.toUpperCase() == "OK") {
//       return captcha.data;
//     }
//     return null;
//   } catch (error) {
//     throw error;
//   }
// }

/***
 * 说明：
 *      在某些情况下，为了抵抗恶意攻击，一些操作需要验证码进行限制。
 *      用户获取验证码需要提供两个要素：[id: 谁要申请验证码],[type: 申请验证码的目的行文]
 *      程序会验证type是否合法，type 的行为定义参考 'file://../statics/captchaCodeActionType.ts'
 *
 *      举例：
 *          1. 用户需要发送手机短信验证码，提交发送短信验证码需通过服务器的图片验证码验证流程。
 *              这里 [id] 是用户的手机号码，格式是 phoenArea+phone，[例：+16999999999]。
 *              [type] 是 [captchaCodeActionType] 里定义的，参考文档。
 *
 *
 *      如果用户发来的 [type] 是 [captchaCodeActionType] 里没定义的，则视为非法，获取图片验证码的行为终止。
 */
export async function getCaptchaPng(
  req: express.Request,
  res: express.Response
) {
  var id: string = String(req.query.id);
  var type: string = String(req.query.type);

  if (id == null || id == "") {
    res.send(resp.fail("Please provide id!"));
    return;
  }

  var isTypeValid: boolean = Types.CaptchaCodeActionTypes.isValidType(
    Number(type)
  );
  if (isTypeValid == false) {
    res.send(resp.fail("Invalid action type!"));
    return;
  }

  /// svg
  // var captcha = svgCaptcha.create({ background: "#34bdeb" });
  // var capcode = captcha.text;

  // if (capcode == null || capcode == "") {
  //   res.send(resp.fail("Please try again later!"));
  //   return;
  // }

  var capcode = getRandomNumber(4);
  var p = new captchapng(80, 30, capcode); // width,height,numeric captcha
  p.color(87, 122, 179, 255); // First color: background (red, green, blue, alpha)
  p.color(240, 243, 247, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  // var imgbase64 = new Buffer(img, "base64");
  var imgbase64 = Buffer.alloc(img.length, img, "base64");

  var result: string = await storeCaptchaInfoToRedis(
    String(capcode),
    id,
    type,
    600
  ); ///验证码有效时间为10分钟
  // console.log("redis result: " + result);
  if (result.toUpperCase() == "OK") {
    // res.type("svg");
    // res.status(200).send(captcha.data);

    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    res.end(imgbase64);

    return;
  }
  res.send(resp.fail("Please try again later!"));
  return;
}

/**
 * 将图片验证码信息登记在redis里。
 *
 * @param captchaCode   以 value 的形式储存在 redis。
 * @param id
 * @param type          key 组合是： [id + "-" + type]。
 * @param duration      验证码有效期，单位是 秒。
 *
 * Redis 里存储方式：
 *      key：[id + "-" + type]
 *      value：captchaCode
 *      有效时间：duration，单位是秒。
 */
export async function storeCaptchaInfoToRedis(
  captchaCode: string,
  id: string,
  type: string,
  duration: number = 600
): Promise<string | any> {
  // console.log("captchaCode: " + captchaCode);
  // console.log("id: " + id);
  // console.log("type: " + type);
  // console.log("duration: " + duration);

  var key: string = id + "-" + type;
  return await redis.set(key, captchaCode, "ex", duration);
}

/**
 * 验证图片验证码
 *
 * @param captchaCode
 * @param id
 * @param type
 *
 * 备注：验证成功返回true，该验证码会被销毁，以确保一次有效验证。
 *      验证码不区分大小写。
 */
export async function validateCaptcha(
  captchaCode: string,
  id: string,
  type: string
): Promise<boolean> {
  if (captchaCode == null || captchaCode == "" || id == null || id == "") {
    return false;
  }

  var isTypeValid: boolean = Types.CaptchaCodeActionTypes.isValidType(
    Number(type)
  );
  if (isTypeValid == false) {
    return false;
  }

  var key: string = id + "-" + type;
  var result = await redis.get(key);
  if (result) {
    if (result.toLowerCase() == captchaCode.toLowerCase()) {
      redis.del(key);
      return true;
    }
  }

  return false;
}
