import { UserRole } from "../../../classes/userRole";
import UserRolesDbModel from "../../dbModels/userRoles";
import Errors from "../../../errors";
import RoleServices from "./roleServices";

/// 获取用户的Role
const getUserRoles = async (uid: string): Promise<UserRole[]> => {
  try {
    var result = await UserRolesDbModel.findAll({
      where: {
        uid: uid,
      },
    });
    var roles: UserRole[] = [];
    if (result) {
      for (var i = 0; i < result.length; i++) {
        roles.push(new UserRole(result[i].toJSON()));
      }
    }
    return roles;
  } catch (error) {
    throw error;
  }
};

/// 用户自己添加Role
const addUserRole = async (uid: string, roleCode: number): Promise<any> => {
  try {
    ///  检查该roleCode是否有效
    var isRoleCodeValid = await RoleServices.isValidRole(roleCode);
    if (isRoleCodeValid == false) {
      throw Errors.RolePermissionError.INVALID_USER_ROLE_CODE;
    }
    return await UserRolesDbModel.create({
      uid,
      roleCode,
      flag: 1,
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getUserRoles,
  addUserRole,
};
