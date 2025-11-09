import { NextFunction, Request, Response } from "express";
import { verifyAccessToken, verifyRefreshToken, generateTokens } from "../utils/jwt";
import RequestWithUser from "../utils/request";

export const validateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;
  console.log(accessToken)
  console.log(refreshToken)
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Unauthorized: No tokens provided. Please login." });
  }
  if (accessToken) {
    const accessPayload = await verifyAccessToken(accessToken);
    if (accessPayload) {
      req.user = accessPayload;
      return next();
    }
  }

  if (refreshToken) {
    const refreshPayload = await verifyRefreshToken(refreshToken);
    if (!refreshPayload) return res.status(401).json({ message: "Unauthorized: Invalid refresh token. Please login again." })
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(refreshPayload);
    // res.cookie("accessToken", newAccessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 900000, 
    // });

    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 604800000, 
    // });

    // req.user = refreshPayload; 
    // return next();
    res.json({refereshToken:newRefreshToken,accessToken:newAccessToken})
  }

};
