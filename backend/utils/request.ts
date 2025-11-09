import { Request as ExpressRequest, Response, NextFunction } from "express";
import { JWTPayload } from "./jwt";
type RequestWithUser = ExpressRequest & { user?: JWTPayload };

export default RequestWithUser