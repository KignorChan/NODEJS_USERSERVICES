import { FlagDefine } from "./flagDefine";

export default {
  CLOSED: new FlagDefine({
    code: 0,
    name: "CLOSED",
    desc: "Closed status!",
    nameCN: "关闭状态！",
  }),
  OPEN_PUBLIC: new FlagDefine({
    code: 1,
    name: "OPEN_PUBLIC",
    desc: "Open for public!",
    nameCN: "开放给公众，用户可自行获取！",
  }),
  OPEN_ADMIN: new FlagDefine({
    code: 2,
    name: "OPEN_ADMIN",
    desc: "Open for admin!",
    nameCN: "开放给管理员，给管理员使用！",
  }),
};
