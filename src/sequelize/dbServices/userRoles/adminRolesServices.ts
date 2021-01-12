import RoleModel from "../../dbModels/roles";
import { Role } from "../../../classes/role";
import Errors from "../../../errors";
import RolePermissionModel from "../../dbModels/rolePermissions";
import PermissionModel from "../../dbModels/permissions";
import Flags from "../../../statics/flags";

async function createUserRoleAdmin(body: Role): Promise<any> {
  try {
    return await RoleModel.create({
      roleCode: body.roleCode,
      name: body.name,
      description: body.description,
      nameCn: body.nameCn,
      flag: body.flag,
    });
  } catch (error) {
    throw error;
  }
}

async function changeRoleFlag(
  roleCode: number,
  flag: number
): Promise<boolean> {
  try {
    if (
      ![
        Flags.RoleFlags.CLOSED.code,
        Flags.RoleFlags.OPEN_ADMIN.code,
        Flags.RoleFlags.OPEN_PUBLIC.code,
      ].includes(flag)
    ) {
      throw Errors.CommonError.INVALID_FLAG;
    }

    var result = await RoleModel.update(
      {
        flag,
      },
      {
        where: {
          roleCode: roleCode,
        },
      }
    );

    if (Number(result[0]) > 0) {
      return true;
    } else {
      throw Errors.CommonError.DATA_NOT_FOUND;
    }
  } catch (error) {
    throw error;
  }
}

async function getAllRoles(flag: any): Promise<Role[] | null> {
  try {
    var filter = {};
    if (flag != null) {
      filter["flag"] = flag;
    }
    var result = await RoleModel.findAll({
      where: filter,
      // include:[{all:true}]
      include: {
        model: RolePermissionModel,
        foreignKey: "roleCode",
        as: "permissions",
        // through: RolePermissionModel,
        include: [
          {
            model: PermissionModel,
            as: "permission",
            foreignKey: "permissionCode",
            required: false,
          },
        ],
      },
    });

    if (result) {
      if (result.length > 0) {
        var datasToReturn: Role[] = [];
        for (var i = 0; i < result.length; i++) {
          datasToReturn.push(new Role(result[i].toJSON()));
        }

        return datasToReturn;
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

async function getOneRole(roleCode: any): Promise<Role | null> {
  try {
    var filter = {};
    if (roleCode != null) {
      filter["roleCode"] = roleCode;
    }

    var result = await RoleModel.findOne({
      where: filter,
      // include:[{all:true}]
      include: {
        model: RolePermissionModel,
        foreignKey: "roleCode",
        as: "permissions",
        // through: RolePermissionModel,
        include: [
          {
            model: PermissionModel,
            as: "permission",
            foreignKey: "permissionCode",
            required: false,
          },
        ],
      },
    });

    if (result) {
      return new Role(result.toJSON());
    } else {
      throw Errors.CommonError.DATA_NOT_FOUND;
    }
  } catch (error) {
    throw error;
  }
}

async function isValidRole(roleCode: number): Promise<boolean> {
  try {
    if (roleCode == 0) {
      return false;
    }
    var count = await RoleModel.count({
      where: {
        roleCode,
        flag: 1,
      },
    });

    if (count > 0) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}

export default {
  createUserRoleAdmin,
  changeRoleFlag,
  getAllRoles,
  isValidRole,
  getOneRole,
};
