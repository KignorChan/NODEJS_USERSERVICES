import { TypeDefine } from "./typeDefine";

class LoginTypes {
  public phone: TypeDefine = new TypeDefine({
    type: 1,
    name: "phone",
    desc: "Login via phone number",
    nameCN: "电话号码",
  });
  public username: TypeDefine = new TypeDefine({
    type: 2,
    name: "username",
    desc: "Login via username",
    nameCN: "用户名登陆",
  });
  public email: TypeDefine = new TypeDefine({
    type: 3,
    name: "email",
    desc: "Login via email address",
    nameCN: "邮箱登陆",
  });

  public isValidType(type: number): boolean {
    var availableTypes: number[] = [
      this.phone.type,
      this.username.type,
      this.email.type,
    ];

    if (availableTypes.includes(type)) {
      return true;
    }

    return false;
  }
}

export default new LoginTypes();
