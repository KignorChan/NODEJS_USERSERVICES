export class UserRole {
  id: number;
  uid: string;
  roleCode: number;
  flag: number;
  createdAt: Date;
  updatedAt: Date;
  _object: string = "UserRole";

  constructor({ id, uid, roleCode, flag, createdAt, updatedAt }: any) {
    this.id = id;
    this.uid = uid;
    this.roleCode = roleCode;
    this.flag = flag;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJson() {
    return {
      id: this.id,
      uid: this.uid,
      roleCode: this.roleCode,
      flag: this.flag,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
