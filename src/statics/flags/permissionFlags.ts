import { FlagDefine } from "./flagDefine";

export default {
  CLOSED: new FlagDefine({
    code: 0,
    name: "CLOSED",
    desc: "Closed status!",
    nameCN: "关闭状态！",
  }),
  OPEN: new FlagDefine({
    code: 1,
    name: "OPEN",
    desc: "Open status!",
    nameCN: "开放状态！",
  }),
};
