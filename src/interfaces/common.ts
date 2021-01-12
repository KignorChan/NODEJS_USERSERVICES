export interface CaptchaValidateBodySchema {
  captchaCode: string;
  type: string;
  id: string;
}

export interface AccesstokenValidateBodySchema {
  accesstoken: string;
}

export interface SendSmsBodyschema {
  fullPhone: string;
  captchaCode: string;
}
