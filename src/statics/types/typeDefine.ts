export class TypeDefine {
    type: number = 0;
    name: string = "";
    desc: string = "";
    nameCN: string = "";
  
    constructor({ type, name, desc, nameCN }) {
      this.type = type;
      this.name = name;
      this.desc = desc;
      this.nameCN = nameCN;
    }
  
    getName(lang: string): string {
      if (lang == "cn") {
        return this.nameCN;
      }
  
      return name;
    }
  }
  