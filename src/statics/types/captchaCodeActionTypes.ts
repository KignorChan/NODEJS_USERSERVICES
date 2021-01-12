import { TypeDefine } from "./typeDefine";

class CaptchaCodeActionTypes {
  public sendSms: TypeDefine = new TypeDefine({
    type: 100,
    name: "sendSms",
    desc: "Send sms type.",
    nameCN: "发送短信",
  });

  public isValidType(type: number): boolean {
    var availableTypes: number[] = [this.sendSms.type];

    if (availableTypes.includes(type)) {
      return true;
    }

    return false;
  }
}

export default new CaptchaCodeActionTypes();
