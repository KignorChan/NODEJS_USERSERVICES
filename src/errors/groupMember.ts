import { ErrorDefine } from "./ErrorDefine";

export default {
  GROUP_MEMBER_NOT_EXIST: new ErrorDefine(
    10801,
    "GROUP_MEMBER_NOT_EXIST",
    "GROUP_MEMBER_ERROR",
    "The group' member is not exist!",
    "该群组成员不存在！"
  ),
  CREATE_GROUP_MEMBER_FAILED_UNKNOWN_ERROR: new ErrorDefine(
    10802,
    "CREATE_GROUP_MEMBER_FAILED_UNKNOWN_ERROR",
    "GROUP_MEMBER_ERROR",
    "Create group's member failed with unknown error!",
    "创建群组成员信息失败！未知错误！"
  ),
};
