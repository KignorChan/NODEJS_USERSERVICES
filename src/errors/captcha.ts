import { ErrorDefine } from "./ErrorDefine";

export default {
  MISSING_PARAM_ID: new ErrorDefine(
    11101,
    "MISSING_PARAM_ID",
    "CAPTCHA_ERROR",
    "Missing parameter id!",
    "缺乏参数id！"
  ),
  MISSING_PARAM_TYPE: new ErrorDefine(
    11102,
    "MISSING_PARAM_TYPE",
    "CAPTCHA_ERROR",
    "Missing parameter type!",
    "缺乏参数type！"
  ),
  INVALID_TYPE: new ErrorDefine(
    11103,
    "INVALID_TYPE",
    "CAPTCHA_ERROR",
    "Invalid type!",
    "无效type！"
  ),
  CREATE_CAPTCHA_FAILED: new ErrorDefine(
    11104,
    "CREATE_CAPTCHA_FAILED",
    "CAPTCHA_ERROR",
    "Create captcha failed! Please try again later!",
    "创建图片验证码失败！请稍后再试！"
  ),
};
