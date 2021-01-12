const env = "development";

export default {
  PORT: 3101,
  env,
  environment: env,
  redis: process.env.REDIS_HOST ? process.env.REDIS_HOST.toString() : "",
  mongodb: process.env.MONGODB_HOST ? process.env.MONGODB_HOST.toString() : "",
  mysql: process.env.MYSQL_HOST ? process.env.MYSQL_HOST.toString() : "",
  mssql:process.env.MSSQL_HOST ? process.env.MSSQL_HOST.toString() : "",
  fileServerHost:"http://192.168.2.189:3109"
};
