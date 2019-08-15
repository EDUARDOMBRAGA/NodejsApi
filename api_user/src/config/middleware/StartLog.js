import { appName } from "../environment/index.js";
import * as crypto from "crypto";

export default app => {
  return {
    generating: (req, res, next) => {
      let user = {
        token: req.headers.authentication,
        userIp: req.ip.replace("::ffff:", "")
      };

      res.header("Content-Type", "application/json; charset=utf-8");

      res.locals.log = {
        loggedAt: new Date(),
        user: user,
        userIp: req.headers.Client || user.userIp,
        ipReq: user.userIp,
        application: appName,
        method: req.method + " - " + req.path,
        query:
          req.query !== undefined
            ? Object.keys(req.query).length
              ? req.query
              : null
            : null,
        body:
          req.body !== undefined
            ? Object.keys(req.body).length
              ? req.body
              : null
            : null
      };

      if (req.path.toLowerCase().indexOf("public") === -1) {
        if (!req.headers.authentication) {
          res.locals.log.httpCode = 401;
          res.locals.log.description = "Operação não autorizada";
        } else {
          try {
            if (!user.token) {
              res.locals.log.httpCode = 401;
              res.locals.log.description = "Token não localizado";
            } else {
              req.user = decrypt(user.token);
            }
          } catch (error) {
            res.locals.log.httpCode = 401;
            res.locals.log.description = "Token inválido. " + error;
          }
        }
      }

      //caso já houver algum erro na req, eu já gravo o log aqui
      if (res.locals.log.httpCode) {
        //enviar log

        return res
          .status(res.locals.log.httpCode)
          .json({ message: res.locals.log.description });
      }

      next();
    }
  };
};

function decrypt(text) {
  const algorithm = process.env.ALGORITHM;
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

  try {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString());
  } catch (e) {
    throw { error: e.message };
  }
}
