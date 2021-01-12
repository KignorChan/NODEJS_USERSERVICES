import { ErrorDefine } from "./ErrorDefine";

export default {
  ROLE_ALREADY_EXIST_FOR_USER: new ErrorDefine(
    10401,
    "ROLE_ALREADY_EXIST_FOR_USER",
    "ROLE_PERMISSION_ERROR",
    "The user already has the role!",
    "确该用户已经拥有该身份了！"
  ),
  INVALID_USER_ROLE_CODE: new ErrorDefine(
    10402,
    "INVALID_USER_ROLE_CODE",
    "ROLE_PERMISSION_ERROR",
    "The user code provided is invalid!",
    "提供的身份代码无效！"
  ),
  USER_HAS_NO_PERMISSION: new ErrorDefine(
    10403,
    "USER_HAS_NO_PERMISSION",
    "ROLE_PERMISSION_ERROR",
    "The user has no permission!",
    "该用户没有权限操作！"
  ),
  NOT_GROUP_MEMBER: new ErrorDefine(
    10404,
    "NOT_GROUP_MEMBER",
    "ROLE_PERMISSION_ERROR",
    "The user is not member in this group!",
    "该用户不是组织里的成员！"
  ),

  //// For admin
  ROLE_NOT_EXIST: new ErrorDefine(
    10421,
    "ROLE_NOT_EXIST",
    "ROLE_PERMISSION_ERROR",
    "The role is not exist!",
    "该身份不存在！"
  ),
  INVALID_ROLE: new ErrorDefine(
    10422,
    "INVALID_ROLE",
    "ROLE_PERMISSION_ERROR",
    "The role is invalid!",
    "无效身份！"
  ),
  PERMISSION_NOT_EXIST: new ErrorDefine(
    10423,
    "PERMISSION_NOT_EXIST",
    "ROLE_PERMISSION_ERROR",
    "The permission is not exist!",
    "该权限不存在！"
  ),
  INVALID_PERMISSION: new ErrorDefine(
    10424,
    "INVALID_PERMISSION",
    "ROLE_PERMISSION_ERROR",
    "The permission is invalid!",
    "无效权限！"
  ),
  PERMISSION_NOT_EXIST_IN_ROLE: new ErrorDefine(
    10425,
    "PERMISSION_NOT_EXIST_IN_ROLE",
    "ROLE_PERMISSION_ERROR",
    "The permission is not exist in this role!",
    "这个身份没有这个权限！"
  ),
};
