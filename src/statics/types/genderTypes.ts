import { TypeDefine } from "./typeDefine";

class GenderTypes {
  public undefined: TypeDefine = new TypeDefine({
    type: 0,
    name: "undefined",
    desc: "Undefined type.",
    nameCN: "未定义类型",
  });
  public male: TypeDefine = new TypeDefine({
    type: 1,
    name: "male",
    desc: "Gender male.",
    nameCN: "男",
  });
  public female: TypeDefine = new TypeDefine({
    type: 2,
    name: "female",
    desc: "Gender female.",
    nameCN: "女",
  });

  public isValidType(type: number): boolean {
    var availableTypes: number[] = [
      this.undefined.type,
      this.male.type,
      this.female.type,
    ];

    if (availableTypes.includes(type)) {
      return true;
    }

    return false;
  }
}

export default new GenderTypes();
