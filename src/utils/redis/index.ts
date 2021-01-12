import IORedis from "ioredis";
import configs from "../../configs";

// let connected: boolean = false;

const redis: IORedis.Redis = new IORedis(configs.redis);

redis.on("connect", () => {
  console.log("redis connected");
  // connected = true;
});
redis.on("error", (err: any) => {
  // connected = false;
  console.log(err);
});

export { redis };
