import { User } from "../classes/user";
import resp from "../utils/resp/resp";
import { validateSmsCode } from "../utils/smsUtils";
import usersService from "./usersServices";
import jwtUtils from "../utils/jwt";
import Errors from "../errors";
import usersDbService from "../sequelize/dbServices/users";

/**
 * 通过手机号码登陆
 *
 * @param fullPhone
 * @param smsCode
 * @param ip
 * @param password
 * @param passwordConfirm
 */
async function loginWithPhone(
  fullPhone: string,
  smsCode: string,
  password: string | null,
  passwordConfirm: string | null,
  ip: string
): Promise<any> {
  try {
    console.log("login via: phone");

    /// 电话号码不能为空
    if (fullPhone == null || fullPhone == "") {
      return Errors.AuthError.MISSING_PHONENUMBER;
    }

    /// 如果提供密码了，就验证密码登陆
    if (password != null) {
      if (password != passwordConfirm) {
        return Errors.AuthError.CONFIRM_PASSWORD_NOT_MATCH;
      }
    } else {
      /// 如果密码没提供，就验证smsCode登陆
      /// 短信验证码不能为空
      if (smsCode == null || smsCode == "") {
        return Errors.AuthError.INVALID_SMS_CODE;
      }

      /// 验证短信验证码
      var isSmsValid = await validateSmsCode(fullPhone, smsCode);
      if (isSmsValid == false) {
        return Errors.AuthError.INVALID_SMS_CODE;
      }
    }

    /// 查找该用户
    var user: User | null = await usersService.findUserByPhoneNumber(fullPhone);

    if (!user) {
      throw Errors.UserError.USER_NOT_EXIST;
    }

    /// 如果提供了密码，检查密码是否有效
    if (password != null) {
      usersDbService.checkUserPassword(user, password);
    }

    /// 生成用户数据并发送到前端
    return await processUserDataToSend(user, ip);
  } catch (error) {
    throw error;
  }
}

async function loginWithUsername(
  username: string,
  password: string,
  ip: string
): Promise<any> {
  try {
    console.log("login via: username");

    /// 用户名不能为空
    if (username == null || username == "") {
      return Errors.AuthError.MISSING_USERNAME;
    }

    /// 检查密码是否一致
    if (password == null || password == "") {
      return Errors.AuthError.MISSING_PASSWORD;
    }

    /// 查找用户并反馈到前端
    var user = await usersService.findUserByUsername(username);

    if (!user) {
      throw Errors.UserError.USER_NOT_EXIST;
    }

    /// 检查密码是否有效
    // if (password != null) {
    usersDbService.checkUserPassword(user, password);
    /// 生成用户数据并发送到前端
    return await processUserDataToSend(user, ip);
  } catch (error) {
    throw error;
  }
}

/**
 * 生成用户端数据
 *
 * @param user
 * @param ip
 */
async function processUserDataToSend(user: User, ip: string): Promise<object> {
  try {
    if (user == null) {
      return Errors.AuthError.USER_NOT_EXIST;
    }

    /// 生成 tokens
    var accessToken = await jwtUtils.generateAccessToken({
      type: jwtUtils.tokenTypes.accessToken,
      uid: user.uid,
    });
    var refreshToken = await jwtUtils.generateRefreshToken({
      type: jwtUtils.tokenTypes.accessToken,
      uid: user.uid,
    });

    /// 生成发送前端的数据包
    var dataToSend = user.toProfileJson();
    dataToSend["accessToken"] = accessToken;
    dataToSend["refreshToken"] = refreshToken;

    /// 记录用户登陆状态信息
    if (user.uid != null && user.uid != "") {
      usersService.onUserSignedIn(user.uid, ip, refreshToken);
    }

    return resp.ok(dataToSend);
  } catch (error) {
    throw error;
  }
}

export default {
  loginWithPhone,
  loginWithUsername,
};
