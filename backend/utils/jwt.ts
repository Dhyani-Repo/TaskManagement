import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { getRedis } from "./redis";

const redis = getRedis();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

const ACCESS_EXPIRES: number = Number(process.env.ACCESS_TOKEN_EXPIRES) || 900; // 15 min
const REFRESH_EXPIRES: number = Number(process.env.REFRESH_TOKEN_EXPIRES) || 604800; // 7 days

export interface JWTPayload {
  id: string;
  role: string;
}

// Helper to convert seconds to milliseconds for Redis TTL
const secondsToMilliseconds = (seconds: number) => seconds * 1000;

export const generateTokens = async (payload: JWTPayload) => {
  // Remove exp property if exists
  const { exp, iat, ...safePayload } = payload as any;

  const accessToken = jwt.sign(safePayload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
  const refreshToken = jwt.sign(safePayload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

  try {
    await redis.set(`access:${payload.id}`, accessToken, "PX", ACCESS_EXPIRES * 1000);
    await redis.set(`refresh:${payload.id}`, refreshToken, "PX", REFRESH_EXPIRES * 1000);
  } catch (err) {
    console.error("Redis error storing tokens:", err);
  }

  return { accessToken, refreshToken };
};


export const verifyAccessToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const payload = jwt.verify(token, ACCESS_SECRET) as JWTPayload;
    const redisToken = await redis.get(`access:${payload.id}`);
    if (!redisToken || redisToken !== token) return null;
    return payload;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.log("Access token expired:", err.message);
      return null;
    }
    console.log("Invalid access token:", err.message);
    return null;
  }
};

export const verifyRefreshToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const payload = jwt.verify(token, REFRESH_SECRET) as JWTPayload;
    console.log(payload)
    const redisToken = await redis.get(`refresh:${payload.id}`);
    if (!redisToken || redisToken !== token) return null;

    return payload;
  } catch(e) {
    console.log(e)
    return null;
  }
};
