import { UserRole } from "./userRole";

export class User {
  uid: string;
  username: string;
  nickname: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  description: string | null;
  birthday: Date | null;
  gender: number;
  phoneArea: string | null;
  fullPhone: string | null;
  email: string | null;
  password: string | null;
  createIp: string | null;
  lastLoginIp: string | null;
  createTime: number | null;
  lastLoginTime: number | null;
  modifyTime: number | null;
  accessToken: string | null;
  refreshToken: string | null;
  flag: number;
  roleCodes: number[];
  // userRoles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
  _object: string = "User";

  constructor({
    uid,
    username,
    nickname,
    firstName,
    lastName,
    avatarUrl,
    description,
    birthday,
    gender,
    phoneArea,
    fullPhone,
    email,
    password,
    createIp,
    lastLoginIp,
    createTime,
    lastLoginTime,
    modifyTime,
    accessToken,
    refreshToken,
    flag,
    userRoles,
    createdAt,
    updatedAt,
    roleCodes,
  }: any) {
    this.uid = uid;
    this.username = username;
    this.nickname = nickname;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.description = description;
    this.birthday = birthday;
    this.gender = gender;
    this.phoneArea = phoneArea;
    this.fullPhone = fullPhone;
    this.email = email;
    this.password = password;
    this.createIp = createIp;
    this.lastLoginIp = lastLoginIp;
    this.createTime = createTime;
    this.lastLoginTime = lastLoginTime;
    this.modifyTime = modifyTime;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.flag = flag;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.roleCodes = [];
    // this.userRoles = [];
    if (roleCodes != null) {
      this.roleCodes = roleCodes;
    }

    if (typeof userRoles == "object") {
      if (userRoles.length > 0) {
        for (var i = 0; i < userRoles.length; i++) {
          if (userRoles[i]) {
            if (userRoles[i].roleCode) {
              this.roleCodes.push(userRoles[i].roleCode);
            }
          }
        }
      }
    }
  }

  toJson(): Object {
    return {
      uid: this.uid,
      username: this.username,
      nickname: this.nickname,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarUrl: this.avatarUrl,
      description: this.description,
      birthday: this.birthday,
      gender: this.gender,
      phoneArea: this.phoneArea,
      fullPhone: this.fullPhone,
      email:this.email,
      createIp: this.createIp,
      lastLoginIp: this.lastLoginIp,
      createTime: this.createTime,
      lastLoginTime: this.lastLoginTime,
      modifyTime: this.modifyTime,
      refreshToken: this.refreshToken,
      flag: this.flag,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toProfileJson() {
    return {
      uid: this.uid,
      username: this.username,
      nickname: this.nickname,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarUrl: this.avatarUrl,
      description: this.description,
      birthday: this.birthday,
      gender: this.gender,
      phoneArea: this.phoneArea,
      fullPhone: this.fullPhone,
      email:this.email,
      lastLoginIp: this.lastLoginIp,
      createTime: this.createTime,
      lastLoginTime: this.lastLoginTime,
      modifyTime: this.modifyTime,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toCreateUserJson(): Object {
    return {
      username: this.username,
      nickname: this.nickname,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarUrl: this.avatarUrl,
      description: this.description,
      birthday: this.birthday,
      gender: this.gender,
      phoneArea: this.phoneArea,
      fullPhone: this.fullPhone,
      email: this.email,
      password: this.password,
      createIp: this.createIp,
      flag: 1,
    };
  }

  toUpdateUserInfoJson(): Object {
    return {
      nickname: this.nickname,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarUrl: this.avatarUrl,
      description: this.description,
      birthday: this.birthday,
      gender: this.gender,
      phoneArea: this.phoneArea,
      fullPhone: this.fullPhone,
      email: this.email,
    };
  }
}
