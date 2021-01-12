import { ErrorDefine } from "./ErrorDefine";

export default {
  USER_NOT_EXIST: new ErrorDefine(
    10101,
    "USER_NOT_EXIST",
    "USER_ERROR",
    "The user does not exist!",
    "该用户不存在！"
  ),
  USER_PASSWORD_NOT_SET: new ErrorDefine(
    10102,
    "USER_PASSWORD_NOT_SET",
    "USER_ERROR",
    "The user has not set password yet!",
    "该用户还没设定密码！"
  ),
};
