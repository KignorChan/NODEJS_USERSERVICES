export class Permission {
  permissionCode: number;
  name: string;
  description: string;
  nameCn: string;
  flag: number;
  _object: string = "Permission";

  constructor({ permissionCode, name, description, nameCn, flag }: any) {
    this.permissionCode = permissionCode;
    this.name = name.toUpperCase();
    this.description = description;
    this.nameCn = nameCn;
    this.flag = flag;
  }

  getName(lang: string): string {
    if (lang == "cn") {
      return this.nameCn;
    }

    return name;
  }

  toJson(): object {
    return {
      permissionCode: this.permissionCode,
      name: this.name,
      description: this.description,
      nameCn: this.nameCn,
      flag: this.flag,
    };
  }
}
