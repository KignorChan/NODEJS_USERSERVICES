import { isArray } from "lodash";
import { Permission } from "./permission";

export class Role {
  roleCode: number;
  name: string;
  description: string;
  nameCn: string;
  permissions: Permission[];
  flag: number;
  _object: string = "Role";

  constructor({ roleCode, name, description, nameCn, permissions, flag }: any) {
    this.roleCode = roleCode;
    this.name = name.toUpperCase();
    this.description = description;
    this.nameCn = nameCn;
    this.flag = flag;
    this.permissions = [];

    if (permissions) {
      if (isArray(permissions)) {
        if (permissions.length > 0) {
          for (var i = 0; i < permissions.length; i++) {
            if (permissions[i].permission) {
              var per = new Permission(permissions[i].permission);
              per.flag = permissions[i]["flag"];
              this.permissions.push(per);
            } else {
              var per = new Permission(permissions[i]);
              this.permissions.push(per);
            }
          }
        }
      }
    }
  }

  getName(lang: string): string {
    if (lang == "cn") {
      return this.nameCn;
    }

    return name;
  }

  toJson(): object {
    var pers: object[] = [];
    if (this.permissions != null) {
      for (var i = 0; i < this.permissions.length; i++) {
        pers.push(this.permissions[i].toJson());
      }
    }

    return {
      roleCode: this.roleCode,
      name: this.name,
      description: this.description,
      nameCn: this.nameCn,
      flag: this.flag,
      permissions: pers,
    };
  }
}
