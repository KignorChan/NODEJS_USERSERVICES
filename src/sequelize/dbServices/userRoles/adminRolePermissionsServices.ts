import RolePermissionModel from "../../dbModels/rolePermissions";
import Errors from "../../../errors";

import RoleDbServices from "./adminRolesServices";
import PermissionDbServices from "./adminPermissionsServices";

async function addPermissionToRole(
  permissionCode: number,
  roleCode: number,
  flag: number = 1
): Promise<any> {
  try {
    await RolePermissionModel.sync();

    /// 检验该身份是否有效
    var isRoleValid = await RoleDbServices.isValidRole(roleCode);
    if (isRoleValid == false) {
      throw Errors.RolePermissionError.INVALID_ROLE;
    }

    /// 检验该权限是否有效
    var isPermissionValid = await PermissionDbServices.isValidPermission(
      permissionCode
    );
    if (isPermissionValid == false) {
      throw Errors.RolePermissionError.INVALID_PERMISSION;
    }

    /// 检查该记录是否已经存在
    var count = await RolePermissionModel.count({
      where: {
        permissionCode,
        roleCode,
      },
    });
    if (count > 0) {
      throw Errors.CommonError.DATA_ALREADY_EXIST;
    }

    return await RolePermissionModel.create({
      permissionCode,
      roleCode,
      flag,
    });
  } catch (error) {
    throw error;
  }
}

/// 设置rolePermission Flag
async function setRolePermissionFlag(
  permissionCode: number,
  roleCode: number,
  flag: number
): Promise<boolean> {
  try {
    await RolePermissionModel.sync();

    /// 检验该身份是否有效
    var isRoleValid = await RoleDbServices.isValidRole(roleCode);
    if (isRoleValid == false) {
      throw Errors.RolePermissionError.INVALID_ROLE;
    }

    /// 检验该权限是否有效
    var isPermissionValid = await PermissionDbServices.isValidPermission(
      permissionCode
    );
    if (isPermissionValid == false) {
      throw Errors.RolePermissionError.INVALID_PERMISSION;
    }

    /// 检查该记录是否已经存在
    var count = await RolePermissionModel.count({
      where: {
        permissionCode,
        roleCode,
      },
    });
    if (count == 0) {
      throw Errors.RolePermissionError.PERMISSION_NOT_EXIST_IN_ROLE;
    }

    var result = await RolePermissionModel.update(
      {
        flag: flag,
      },
      {
        where: {
          permissionCode,
          roleCode,
        },
      }
    );
    if (result) {
      if (result[0] && result[0] > 0) {
        return true;
      }
    }

    return false;
  } catch (error) {
    throw error;
  }
}

export default {
  addPermissionToRole,
  setRolePermissionFlag,
};
