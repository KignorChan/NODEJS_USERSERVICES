import { User } from "../classes/user";
import resp from "../utils/resp/resp";
import { validateSmsCode } from "../utils/smsUtils";
import usersService from "./usersServices";
import LoginTypes from "../statics/types/loginTypes";
import Errors from "../errors";
import UserRoleDbServices from "../sequelize/dbServices/userRoles";
import { UserSignupWithPhoneSchema } from "../interfaces/user";

async function signupWithPhone(
  body: UserSignupWithPhoneSchema,
  ip: string
): Promise<any> {
  try {
    var fullPhone: string = body.fullPhone;
    var username: string | null = body.username;
    var password: string | null = body.password;
    var passwordConfirm: string | null = body.passwordConfirm;
    var smsCode: string = body.smsCode;
    var roleCodes: number[] | string = body.roleCodes;

    /// 验证短信验证码
    var isSmsValid = await validateSmsCode(fullPhone, smsCode);
    if (isSmsValid == false) {
      throw Errors.AuthError.INVALID_SMS_CODE;
    }

    /// 检查密码是否一致
    if (password) {
      if (password != passwordConfirm) {
        throw Errors.AuthError.CONFIRM_PASSWORD_NOT_MATCH;
      }
    }

    /// 查看用户是否存在
    var user = await usersService.findUserByPhoneNumber(fullPhone);
    if (user) {
      throw Errors.AuthError.PHONE_NUMBER_IN_USED;
    }

    if (username != null) {
      var user2 = await usersService.findUserByUsername(username);
      if (user2) {
        throw Errors.AuthError.USERNAME_ALREADY_IN_USED;
      }
    }

    var newUser: User | any = await usersService.createUser(
      body,
      ip,
      LoginTypes.phone.type
    );
    if (newUser) {
      if (roleCodes && roleCodes.length > 0) {
        var haveDoneRoleCodes: number[] = [];
        for (var i = 0; i < roleCodes[i]; i++) {
          if (!haveDoneRoleCodes.includes(Number(roleCodes[i]))) {
            await UserRoleDbServices.addUserRole(
              newUser.uid,
              Number(roleCodes[i])
            );
          }

          haveDoneRoleCodes.push(Number(roleCodes[i]));
        }

        var userRoles = await UserRoleDbServices.getUserRoles(newUser.uid);

        if (userRoles && userRoles.length > 0) {
          newUser["userRoles"] = userRoles;
        }
      }

      return resp.ok("User sucessfully signed up!");
    }
    return resp.fail("Unknow error, please try again later!");
  } catch (error) {
    throw error;
  }
}

// async function signupWithEmail(body: any, ip: string): Promise<any> {
//   try {
//     var fullPhone: string = body.fullPhone;
//     var password: any = body.password;
//     var passwordConfirm: any = body.passwordConfirm;
//     var smsCode: string = body.smsCode;
//     var roleCode: number | string = body.roleCode;

//     /// 验证短信验证码
//     var isSmsValid = await validateSmsCode(fullPhone, smsCode);
//     if (isSmsValid == false) {
//       throw Errors.AuthError.INVALID_SMS_CODE;
//     }

//     /// 检查密码是否一致
//     if (password) {
//       if (password != passwordConfirm) {
//         throw Errors.AuthError.CONFIRM_PASSWORD_NOT_MATCH;
//       }
//     }

//     /// 查看用户是否存在
//     var user = await usersService.findUserByPhoneNumber(fullPhone);
//     if (user) {
//       throw Errors.AuthError.PHONE_NUMBER_IN_USED;
//     }

//     var newUser: User | any = await usersService.createUser(
//       body,
//       ip,
//       LoginTypes.phone.code
//     );
//     if (newUser) {
//       if (roleCode) {
//         var result = await UserRoleDbServices.addUserRole(
//           newUser.uid,
//           Number(roleCode)
//         );

//         if (result && result.length > 0) {
//           newUser["userRoles"] = result;
//         }
//       }

//       return resp.ok(newUser);
//     }
//     return resp.fail("Unknow error, please try again later!");
//   } catch (error) {
//     throw error;
//   }
// }

export default {
  signupWithPhone,
  // signupWithEmail,
};
