import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import User from "../modules/user/user.model";
import { StatusCodes } from "http-status-codes";
import AppError from "../errorHelper/AppError";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Accept "Authorization: Bearer <token>" or cookie "accessToken"
      const rawAuth = req.headers.authorization ?? "";
      const bearerToken = rawAuth.startsWith("Bearer ")
        ? rawAuth.slice(7)
        : undefined;
      const accessToken = bearerToken || (req as any).cookies?.accessToken;

      if (!accessToken) {
        throw new AppError(StatusCodes.FORBIDDEN, "No token received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });
      if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
      }
      if (isUserExist.isBlocked) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is Blocked");
      }

      if (!authRoles.includes(String(verifiedToken.role))) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "You are not permitted to view this route!!!"
        );
      }

      // augment request
      (req as any).user = verifiedToken;
      (req as any).id = isUserExist.id;
      next();
    } catch (error) {
      next(error);
    }
  };
