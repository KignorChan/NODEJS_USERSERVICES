import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Request,
  Response,
  SuccessResponse,
  Tags,
} from "tsoa";
import resp from "../utils/resp/resp";
import { validateCaptcha } from "../utils/captchaUtils";
import handleCaughtError from "../utils/resp/handleCaughtError";
// import { getCaptchaSvg2 } from "../utils/captchaUtils";
// import express from "express";
import {
  CaptchaValidateBodySchema,
  AccesstokenValidateBodySchema,
  SendSmsBodyschema,
} from "../interfaces/common";
import { sendSmsCode, validateSmsCode } from "../utils/smsUtils";
import jwtUtils from "../utils/jwt";

@Route("commons")
export class CaptchaController extends Controller {
  // Api for sending sms
  @Post("smscode/send")
  @Tags("Send sms")
  public async sendSms(@Body() body: SendSmsBodyschema): Promise<any> {
    try {
      var captchaCode = body.captchaCode;
      var fullPhone = body.fullPhone;

      return await sendSmsCode(fullPhone, captchaCode);
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("captcha/validate")
  @Tags("Validate captcha")
  public async validateCapCode(
    @Body() body: CaptchaValidateBodySchema
  ): Promise<any> {
    try {
      var captchaCode = body.captchaCode;
      var type = body.type;
      var id = body.id;

      var isValid = await validateCaptcha(captchaCode, id, type);
      if (isValid == true) {
        return resp.ok();
      }
      return resp.fail();
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("accesstoken/validate")
  @Tags("Validate user's access token")
  public async validateAccessToken(
    @Body() body: AccesstokenValidateBodySchema
  ): Promise<any> {
    try {
      var accesstoken = body.accesstoken;
      var tokenObj = await jwtUtils.verifyToken(accesstoken, true);

      if (tokenObj) {
        return resp.ok(tokenObj);
      }
      return resp.fail();
    } catch (error) {
      return handleCaughtError(error);
    }
  }
}
