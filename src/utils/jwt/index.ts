import * as jwt from "jsonwebtoken";
import { redis } from "../redis";
import UserBdService from "../../sequelize/dbServices/users";
import { User } from "../../classes/user";
import errors from "../../errors";

/// 简单定义token的类型
class TokenTypes {
  public accessToken: number = 1;
  public refreshToken: number = 2;
}
var tokenTypes: TokenTypes = new TokenTypes();

var jwtSignature = "secretaaa";

/**
 *
 * @param json
 * @duration           token 有效时间，单位为 秒
 * @param storeInRedis 是否缓存到redis里，默认为开启
 */
async function generateAccessToken(
  json: any,
  duration: number = 60 * 60 * 2,
  storeInRedis: boolean = true
): Promise<string> {
  try {
    var token: string = jwt.sign(json, jwtSignature, { expiresIn: duration });
    if (storeInRedis) {
      await redis.set(token, jwtSignature, "ex", duration);
    }
    return token;
  } catch (e) {
    throw e;
  }
}

async function generateRefreshToken(json: any): Promise<string> {
  try {
    return jwt.sign(json, jwtSignature);
  } catch (e) {
    throw e;
  }
}

/**
 *
 * @param token
 * @param secureWithRedis 是否验证redis里的token记录，默认为开启，比较安全
 *
 */
async function verifyToken(
  token: string,
  secureWithRedis: boolean = true
): Promise<object | string> {
  try {
    if (secureWithRedis) {
      var result = await redis.get(token);
      if (result != jwtSignature) {
        throw errors.AuthError.INVALID_TOKEN;
      }
    }
    return jwt.verify(String(token), jwtSignature);
    // if (result["exp"] != null) {
    //   var exp: Date = new Date(Number(result["exp"]) * 1000);
    //   var now: Date = new Date();
    //   console.log("now: " + now);
    //   console.log("exp: " + exp);

    //   if (exp > now) {
    //     return true;
    //   }
    // }

    /// check redis
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      throw errors.AuthError.TOKEN_EXPIRED;
    } else if (e instanceof jwt.JsonWebTokenError) {
      throw errors.AuthError.INVALID_TOKEN;
    } else if (e instanceof jwt.NotBeforeError) {
      throw errors.AuthError.TOKEN_NOT_BEFORE_ERROR;
    } else {
      throw errors.AuthError.INVALID_TOKEN;
    }
  }
}

/**
 * 更新用户的 AccessToken
 * @param refreshToken
 */
async function refreshUserToken(refreshToken: string): Promise<Object> {
  try {
    var tokenData: string | object = jwt.verify(
      String(refreshToken),
      jwtSignature
    );
    if (tokenData) {
      if (tokenData["uid"]) {
        var user: User | null = await UserBdService.getUserByUid(
          tokenData["uid"]
        );
        if (user) {
          if (user.refreshToken == refreshToken) {
            var accessToken = await generateAccessToken({
              type: tokenTypes.accessToken,
              uid: tokenData["uid"],
            });

            return { status: true, accessToken };
          }
        }
      }
    }
    throw errors.AuthError.INVALID_TOKEN;
  } catch (error) {
    throw error;
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  refreshUserToken,
  tokenTypes,
};
