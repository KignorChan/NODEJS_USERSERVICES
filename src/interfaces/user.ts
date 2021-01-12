export interface User {
  uid: string;
  username: string;
  nickname: string;
  avatarUrl: string;
  description: string;
  birthday: Date;
  gender: number;

  createIp: string;
  lastLoginIp: string;

  createTime: number;
  lastLoginTime: number;
  modifyTime: number;
}

export interface UserSignupWithPhoneSchema {
  phoneArea: string;
  fullPhone: string;
  smsCode: string;
  roleCodes: number[];
  username: string | null;
  password: string | null;
  passwordConfirm: string | null;
}

export interface LoginWithPhoneSchema {
  fullPhone: string;
  smsCode: string;
  password: string | null;
  passwordConfirm: string | null;
}

export interface LoginWithUsernameSchema {
  username: string;
  password: string;
}

export interface RefreshTokenBodyScheme {
  refreshToken: string;
}

export interface AddRoleBodyScheme {
  roleCode: string;
}

export interface UpdateUserInfoScheme {
  nickname: string | null;
  avatarUrl: string | null;
  description: string | null;
  birthday: Date | null;
  gender: string;
  phoneArea: string | null;
  fullPhone: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}
