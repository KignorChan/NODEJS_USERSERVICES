import UserModel from "../../dbModels/users";
import { User } from "../../../classes/user";
import Errors from "../../../errors";
import UserRoleModel from "../../dbModels/userRoles";
// import { where } from "sequelize";
import {
  encryptPassword,
  comparePassword,
} from "../../../utils/commons/encryptUtils";
import FildIdUtils from "../../../utils/fileUtils";

const getUserByUid = async (uid: string): Promise<User | null> => {
  try {
    return await getUserByCustomCondition({
      uid,
    });
  } catch (error) {
    throw error;
  }
};

///按电话号码查找用户
const getUserByPhoneNumber = async (
  fullPhone: string
): Promise<User | null> => {
  try {
    return await getUserByCustomCondition({
      fullPhone,
    });
  } catch (error) {
    throw error;
  }
};

/// 按username查找用户
const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    return await getUserByCustomCondition({
      username,
    });
  } catch (error) {
    throw error;
  }
};

/// 自定义获取用户的条件
const getUserByCustomCondition = async (
  where: object
): Promise<User | null> => {
  try {
    // UserRoleModel.belongsTo(UserModel, { foreignKey: "uid", as: "userRoles" });
    var result = await UserModel.findOne({
      where,
      include: [
        {
          model: UserRoleModel,
          as: "userRoles",
        },
      ],
    });
    if (!result) {
      return null;
    }
    var user = new User(result.toJSON());

    if (user) {
      if (user.avatarUrl) {
        user.avatarUrl = await FildIdUtils.fileUrlGetter(user.avatarUrl);
      }

      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

/// 创建新用户
const createUser = async (user: User): Promise<User> => {
  try {
    var userDoc = await UserModel.create(user.toCreateUserJson());
    return new User(userDoc.toJSON());
  } catch (error) {
    throw error;
  }
};

/// 用户登陆后更新用户的一些状态
async function onUserSignedIn(
  uid: string,
  signinIp: string,
  refreshToken: string
) {
  try {
    await UserModel.update(
      {
        lastLoginIp: signinIp,
        lastLoginTime: Date.now(),
      },
      {
        where: {
          uid: String(uid),
        },
      }
    );
    await updateUserRefreshTokenOnDb(uid, refreshToken);
  } catch (error) {
    throw error;
  }
}

/// 在DB里更新用户的refreshToken
async function updateUserRefreshTokenOnDb(
  uid: string,
  refreshToken: string | any
): Promise<boolean> {
  try {
    var result = await UserModel.update(
      {
        refreshToken,
      },
      {
        where: {
          uid: String(uid),
        },
      }
    );

    if (Number(result[0]) > 0) {
      return true;
    }
    return false;
  } catch (e) {
    throw e;
  }
}

function checkUserPassword(user: User, password: string) {
  try {
    if (user?.password == null || user?.password == "") {
      throw Errors.AuthError.USER_PASSWORD_NOT_SET;
    }

    var compareResult = comparePassword(password, user?.password);
    if (compareResult == false) {
      throw Errors.AuthError.INVALID_PASSWORD;
    }
  } catch (error) {
    throw error;
  }
}

/// 创建新用户
async function updateUserInfo(user: User, uid: string): Promise<User | null> {
  try {
    var updateJson = user.toUpdateUserInfoJson();

    if (updateJson["avatarUrl"] != null) {
      updateJson["avatarUrl"] = await FildIdUtils.fileUrlSetter(
        updateJson["avatarUrl"]
      );
    }

    var result = await UserModel.update(updateJson, {
      where: {
        uid: String(uid),
      },
    });

    if (Number(result[0]) > 0) {
      return await getUserByUid(uid);
    }

    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createUser,
  getUserByPhoneNumber,
  getUserByUsername,
  onUserSignedIn,
  updateUserRefreshTokenOnDb,
  getUserByUid,
  // compareUserPassword,
  checkUserPassword,
  updateUserInfo,
};
