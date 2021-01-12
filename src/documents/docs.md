## Apis Documents

----
手机注册：   /user/signup/phone
参数：
```
{
    fullPhone:string                REQUIRED  
    password:string,                
    passwordConfirm:string,
    smsCode:string,                 REQUIRED
    roleCode:string|number,         NOT REQUIRED 
}
```
说明：
    1. 密码非必要，如果提供了则会给用户账号设定密码；
    2. roleCode表示用户的身份，非必要。如果提供了生成账号时会为用户登记该身份；

用户登陆：/user/login
参数：
```
参数根据不同的登陆方式而改变！
1. 手机登陆：
{
    loginType:number|string,        REQUIRED loginType:1
    fullPhone:string,               REQUIRED 
    smsCode:string,                  
    password:string,                
    passwordConfirm:string,             
}
说明： 如果用户提供了密码，则会通过验证密码登陆， 否则，则通过短信验证登陆。


2. 用户名登陆：
{
    loginType:number|string,        REQUIRED loginType:2
    username:string,                REQUIRED
    password:string,                REQUIRED
    passwordConfirm:string,         REQUIRED
}
```
