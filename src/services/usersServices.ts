import { User } from "../classes/user";
import usersDbService from "../sequelize/dbServices/users";
import { encryptPassword } from "../utils/commons/encryptUtils";
import { redis } from "../utils/redis";
import jwtUtils from "../utils/jwt";
import { UpdateUserInfoScheme } from "../interfaces/user";

class UsersServices {
  public async findUserByPhoneNumber(fullPhone: string): Promise<User | null> {
    return await usersDbService.getUserByPhoneNumber(fullPhone.toString());
  }

  public async findUserByUsername(username: string): Promise<User | null> {
    return await usersDbService.getUserByUsername(String(username));
  }

  public async findUserByUid(uid: string): Promise<User | null> {
    return await usersDbService.getUserByUid(String(uid));
  }

  public async createUser(
    body: any,
    createIp: string,
    loginType: number
  ): Promise<User | any> {
    return new Promise((resolve, reject) => {
      var username: string | any = body.username;
      var fullPhone: string = body.fullPhone;

      /// 如果 username 没指定，则设默认的 username
      // if (body.username == null || body.username == "") {
      //     if (loginType == LoginType.phone.code) {
      //         username = fullPhone;
      //     } else if (loginType == LoginType.email.code) {
      //         username = body.email;
      //     }
      // }

      var password: string = "";
      if (body.password != null && body.password != "") {
        password = encryptPassword(body.password);
      }

      var userInfoInJson: object = {
        username: username,
        nickname: body.nickname,
        avatarUrl: body.avatarUrl,
        description: body.description,
        birthday: body.birthday,
        gender: body.gender,
        phoneArea: body.phoneArea,
        fullPhone: fullPhone,
        email: body.email,
        password: password,
        createIp,
      };
      var user = new User(userInfoInJson);
      user.createIp = createIp;

      usersDbService
        .createUser(user)
        .then((user: User) => {
          resolve(user);
        })
        .catch((e) => {
          console.log("dshfjdhk: " + e);
          reject(e);
        });
    });
  }

  /// 记录用户登陆信息，例如登陆ip，时间等
  public async onUserSignedIn(
    uid: string,
    signinIp: string,
    refreshToken: string
  ) {
    usersDbService.onUserSignedIn(uid, signinIp, refreshToken);
  }

  /// 用户退出登陆，销毁refreshToken，清除redis相应token
  public async onUserLogout(
    uid: string,
    authorization: string
  ): Promise<boolean> {
    try {
      var result = await usersDbService.updateUserRefreshTokenOnDb(uid, null);
      var result2 = await redis.del(authorization);

      if (result == false) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  /// 更新用户的token
  public async refreshUserToken(refreshToken: string): Promise<object> {
    try {
      return await jwtUtils.refreshUserToken(refreshToken);
    } catch (error) {
      throw error;
    }
  }

  /// 更新用户信息
  public async updateUserInfo(userInfo: UpdateUserInfoScheme, uid:string): Promise<Object|null> {
    try {
      var user = await usersDbService.updateUserInfo(new User(userInfo), uid);
      if(user){
        return user.toProfileJson();
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default new UsersServices();
