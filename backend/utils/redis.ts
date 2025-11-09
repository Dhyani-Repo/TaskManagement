import Redis from "ioredis";

// export const redis = new Redis({
//     host: process.env.REDIS_HOST || "127.0.0.1",
//     port: Number(process.env.REDIS_PORT) || 6379,
//     password: process.env.REDIS_PASSWORD || undefined,
// });

// redis.on("connect", () => console.log("✅ Connected to Redis"));
// redis.on("error", (err) => console.error("❌ Redis error:", err));


let redis: Redis | null = null;

export const getRedis = ():Redis => {
  if (!redis) {
    redis = new Redis({
      host: "127.0.0.1",
      port: 6379,
      password: process.env.REDIS_PASSWORD,
    });

    redis.on("connect", () => console.log("✅ Connected to Redis"));
    redis.on("error", (err) => console.error("❌ Redis error:", err));
  }
  return redis;
};



