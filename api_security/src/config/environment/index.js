"use strict";

import Fs from "fs";
import Dotenv from "dotenv";
import Path from "path";

let initEnvVariables = () => {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";

  const envPath =
    process.env.NODE_ENV === "test"
      ? Path.join(__dirname, "/../../../test/.env")
      : Path.join(__dirname, "/../../../.env-" + process.env.NODE_ENV);

  try {
    Fs.statSync(envPath);
    Dotenv.config({ path: envPath });
  } catch (err) {
    console.log(envPath + " not found, load by environment variables");
  }
};
initEnvVariables();

let config_api = {
  appName: process.env.APP_NAME || "dudu",
  env: process.env.NODE_ENV,
  root: Path.normalize(Path.join(__dirname, "/../../..")),
  routesBaseDir: Path.normalize(Path.join(__dirname, "../../api")),
  host: process.env.HOST || "0.0.0.0",
  port: process.env.API_PORT || 3000,

  system: process.env.SYSTEM,

  mysql: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    pool: {
      min: process.env.MYSQL_POOL_MIN || 1,
      max: process.env.MYSQL_POOL_MAX || 5,
      idle: process.env.MYSQL_POOL_IDLE || 2000
    },
    write: {
      host: process.env.MYSQL_WRITE_HOST
    },
    read: [
      { host: process.env.MYSQL_READ_HOST_1 },
      { host: process.env.MYSQL_READ_HOST_2 },
      { host: process.env.MYSQL_READ_HOST_3 },
      { host: process.env.MYSQL_READ_HOST_4 },
      { host: process.env.MYSQL_READ_HOST_5 }
    ]
  },
  sentry: {
    dsn: process.env.SENTRY_DSN
  }
};

export default config_api;
