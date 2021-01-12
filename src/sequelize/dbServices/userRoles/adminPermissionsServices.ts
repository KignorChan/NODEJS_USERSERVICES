import PermissionModel from "../../dbModels/permissions";
import { Permission } from "../../../classes/permission";
import Errors from "../../../errors";
import Flags from "../../../statics/flags";

async function createPermission(body: Permission): Promise<any> {
  try {
    return await PermissionModel.create({
      permissionCode: body.permissionCode,
      name: body.name,
      description: body.description,
      nameCn: body.nameCn,
      flag: body.flag,
    });
  } catch (error) {
    throw error;
  }
}

async function changePermissionFlag(
  permissionCode: number,
  flag: number
): Promise<boolean> {
  try {
    if (
      ![
        Flags.PermissionFlags.CLOSED.code,
        Flags.PermissionFlags.OPEN.code,
      ].includes(flag)
    ) {
      throw Errors.CommonError.INVALID_FLAG;
    }

    var result = await PermissionModel.update(
      {
        flag,
      },
      {
        where: {
          permissionCode,
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

async function getAllPermissions(flag: any): Promise<Permission[] | null> {
  try {
    var filter = {};
    if (flag != null) {
      filter["flag"] = flag;
    }
    var result = await PermissionModel.findAll({ where: filter });

    if (result) {
      if (result.length > 0) {
        var datasToReturn: Permission[] = [];
        for (var i = 0; i < result.length; i++) {
          datasToReturn.push(new Permission(result[i].toJSON()));
        }

        return datasToReturn;
      } else {
        throw Errors.CommonError.DATA_NOT_FOUND;
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

async function getPermissionBycode(
  permissionCode: string
): Promise<Permission | null> {
  try {
    var filter = {
      permissionCode,
    };

    var result = await PermissionModel.findOne({ where: filter });

    if (result) {
      return new Permission(result.toJSON());
    }
    throw Errors.CommonError.DATA_NOT_FOUND;
  } catch (error) {
    throw error;
  }
}

async function isValidPermission(permissionCode: number): Promise<boolean> {
  try {
    var count = await PermissionModel.count({
      where: {
        permissionCode,
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
  createPermission,
  changePermissionFlag,
  getAllPermissions,
  isValidPermission,
  getPermissionBycode,
};
