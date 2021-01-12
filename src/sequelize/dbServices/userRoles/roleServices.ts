import Error from "../../../errors";

import AdminRoleServices from "./adminRolesServices";

const isValidRole = AdminRoleServices.isValidRole;

async function checkIfRoleHasPermission(
  roleCode: number,
  permissionCode: number,
  flag: number | null = null
): Promise<boolean> {
  try {
    var role = await AdminRoleServices.getOneRole(roleCode);
    if (role) {
      if (role.permissions) {
        var idx = role.permissions.findIndex((per) => {
          if (flag != null) {
            return per.permissionCode == permissionCode && per.flag == flag;
          }

          return per.permissionCode == permissionCode;
        });

        if (idx != -1) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    if (error) {
      if (error["error"] == Error.CommonError.DATA_NOT_FOUND.error) {
        return false;
      }
    }
    throw error;
  }
}

export default {
  isValidRole,
  checkIfRoleHasPermission,
};
