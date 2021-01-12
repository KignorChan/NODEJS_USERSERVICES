import * as crypto from "crypto";

export function encryptPassword(plainPassword: string) {
  let md5 = crypto.createHash("md5"); // 创建 md5
  let md5Sum = md5.update(plainPassword); // update 加密
  let result = md5Sum.digest("hex"); // 获取加密后结果
  return result;
}

export function comparePassword(
  originPassword: string,
  encryptedPassword: string
): boolean {
  try {
    if (
      originPassword != null &&
      originPassword != "" &&
      encryptedPassword != null &&
      encryptedPassword != ""
    ) {
      console.log("origin pass: "+originPassword);
      var result = encryptPassword(originPassword);
      console.log("origin encrypt: "+result);

      console.log("encryptedPassword: "+encryptedPassword);

      if (result == encryptedPassword) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw error;
  }
}
