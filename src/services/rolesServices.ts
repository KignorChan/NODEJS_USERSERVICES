import { User } from "../classes/user";
import UserDbServices from "../sequelize/dbServices/users";
import UserRoleDbServices from "../sequelize/dbServices/userRoles";
import Errors from "../errors";
import { UserRole } from "../classes/userRole";

class RolesServices {
  /**
   * 用户端申请 Role
   * @param uid
   * @param roleCode
   */
  public async addRole(uid: string, roleCode: number): Promise<UserRole[]> {
    try {
      var user: User | null = await UserDbServices.getUserByUid(uid);

      if (!user) {
        throw Errors.UserError.USER_NOT_EXIST;
      }

      /// 检查该用户是否已经拥有该role
      if (user.roleCodes.includes(roleCode)) {
        throw Errors.RolePermissionError.ROLE_ALREADY_EXIST_FOR_USER;
      }

      /// 添加role
      return await UserRoleDbServices.addUserRole(uid, roleCode);
    } catch (error) {
      throw error;
    }
  }
}

export default new RolesServices();
