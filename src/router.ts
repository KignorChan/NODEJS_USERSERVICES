import { getCaptchaPng } from "./utils/captchaUtils";
import { limiter } from "./utils/commons/rateLimiter";
import marked from "marked";
import fs from "fs";
import express from "express";

function router(app: express.Express) {
  app
    .route("/user/ping")
    .post(limiter("/user/ping"), (req: any, res: any) => {
      res.send("user server pong!");
    })
    .get(limiter("/user/ping"), (req: any, res: any) => {
      res.send("user server pong!");
    });

  app.get("/user/documents", limiter("/user/documents"), function (
    req: express.Request,
    res: express.Response
  ) {
    var path = __dirname + "/documents/docs.md";
    var file = fs.readFileSync(path, "utf8");
    res.send(marked(file.toString()));
  });

  app
    .route("/commons/captcha/get")
    .get(limiter("/commons/captcha/get", 50), getCaptchaPng);
}

export { router };
