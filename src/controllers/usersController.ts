// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Request,
  SuccessResponse,
  Security,
  Header,
  Tags,
} from "tsoa";
import resp from "../utils/resp/resp";
import usersService from "../services/usersServices";
import LoginTypes from "../statics/types/loginTypes";
import express from "express";
import jwtUtils from "../utils/jwt";
import handleCaughtError from "../utils/resp/handleCaughtError";
import authServices from "../services/authServices";
import userRegistServices from "../services/userRegistServices";
import rolesServices from "../services/rolesServices";
import {
  UserSignupWithPhoneSchema,
  RefreshTokenBodyScheme,
  AddRoleBodyScheme,
  LoginWithPhoneSchema,
  LoginWithUsernameSchema,
  UpdateUserInfoScheme,
} from "../interfaces/user";
import usersServices from "../services/usersServices";

@Route("user")
export class UsersController {
  @Post("/signup/phone")
  @Tags("For user sign up with phone number")
  public async signupWithPhone(
    @Body() body: UserSignupWithPhoneSchema,
    @Request() request: express.Request
  ): Promise<any> {
    try {
      return await userRegistServices.signupWithPhone(body, request.ip);
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  // @Post("/signup/email")
  // public async signupWithEmail(
  //   @Body() body: any,
  //   @Request() request: express.Request
  // ): Promise<any> {
  //   try {
  //     return await userRegistServices.signupWithEmail(body, request.ip);
  //   } catch (error) {
  //     return handleCaughtError(error);
  //   }
  // }

  @Post("/login/phone")
  @Tags("For user login with phone number")
  public async userLoginPhone(
    @Body() body: LoginWithPhoneSchema,
    @Request() request: express.Request
  ): Promise<any> {
    try {
      var ip = request.ip;

      return await authServices.loginWithPhone(
        body.fullPhone,
        body.smsCode,
        body.password,
        body.passwordConfirm,
        ip
      );
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("/login/username")
  @Tags("For user login with username and password")
  public async userLoginWithUsername(
    @Body() body: LoginWithUsernameSchema,
    @Request() request: express.Request
  ): Promise<any> {
    try {
      var ip = request.ip;

      return await authServices.loginWithUsername(
        body.username,
        body.password,
        ip
      );
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("/login")
  @Tags("For user login")
  public async userLogin(
    @Body() body: any,
    @Request() request: express.Request
  ): Promise<any> {
    try {
      var loginType: number = Number(body.loginType);
      var {
        username,
        fullPhone,
        email,
        smsCode,
        password,
        passwordConfirm,
      } = body;
      var ip = request.ip;

      switch (loginType) {
        case LoginTypes.username.type: {
          return await authServices.loginWithUsername(username, password, ip);
        }

        case LoginTypes.phone.type: {
          return await authServices.loginWithPhone(
            fullPhone,
            smsCode,
            password,
            passwordConfirm,
            ip
          );
        }

        case LoginTypes.email.type: {
          console.log("login via: email");
          return resp.ok("login via: email comming soon!");

          break;
        }

        default: {
          return resp.fail("login via: unknown loginType");
        }
      }
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("/logout")
  @Tags("For user logout")
  public async userLogout(
    @Header("Authorization") authorization: string
  ): Promise<any> {
    try {
      var tokenObj = await jwtUtils.verifyToken(authorization, true);

      if (tokenObj) {
        if (tokenObj["uid"]) {
          var result = await usersService.onUserLogout(
            tokenObj["uid"],
            authorization
          );

          if (result) {
            return resp.ok("Sign out succeed!");
          }
        }
      }
      return resp.fail("Sign out fail with unknown error!");
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Get("/self/get")
  @Tags("For user to get self information")
  public async getUserInfo(
    @Header("Authorization") authorization: string
  ): Promise<any> {
    try {
      var tokenObj = await jwtUtils.verifyToken(authorization, true);

      if (tokenObj) {
        if (tokenObj["uid"]) {
          var userInfo = await usersService.findUserByUid(tokenObj["uid"]);

          if (userInfo) {
            return resp.ok(userInfo);
          }
        }
      }
      return resp.fail();
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("/refreshToken")
  @Tags("For user to refresh their access token")
  public async refreshToken(
    @Body() body: RefreshTokenBodyScheme
  ): Promise<any> {
    try {
      if (body.refreshToken) {
        var result = await usersService.refreshUserToken(body.refreshToken);

        if (result["status"] == true) {
          return resp.ok({ accessToken: result["accessToken"] });
        }
      }
      return resp.fail("Failed to refreshToken!");
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("/roles/add")
  @Tags("For user to apply a role")
  public async addRole(
    @Header("Authorization") authorization: string,
    @Body() body: AddRoleBodyScheme
  ): Promise<any> {
    try {
      var tokenObj = await jwtUtils.verifyToken(authorization, true);

      if (tokenObj) {
        if (tokenObj["uid"]) {
          var result = await rolesServices.addRole(
            tokenObj["uid"],
            Number(body.roleCode)
          );

          if (result) {
            return resp.ok({ userRoles: result });
          }
        }
      }
      return resp.fail();
    } catch (error) {
      return handleCaughtError(error);
    }
  }

  @Post("/update")
  @Tags("For user to update user info")
  public async updateUserInfo(
    @Header("Authorization") authorization: string,
    @Body() body: UpdateUserInfoScheme
  ): Promise<any> {
    try {
      var tokenObj = await jwtUtils.verifyToken(authorization, true);

      if (tokenObj) {
        if (tokenObj["uid"]) {
          var result = await usersServices.updateUserInfo(body,tokenObj["uid"]);

          if (result) {
            return resp.ok(result);
          }
        }
      }
      return resp.fail();
    } catch (error) {
      return handleCaughtError(error);
    }
  }
}
