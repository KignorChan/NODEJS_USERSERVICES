export class FlagDefine {
    code: number = 0;
    name: string = "";
    desc: string = "";
    nameCN: string = "";
  
    constructor({ code, name, desc, nameCN }) {
      this.code = code;
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
  