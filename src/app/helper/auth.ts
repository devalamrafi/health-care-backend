import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "./jwtHelper";
import config from "../../config";

export const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.cookies.accesToken;
      if (!token) {
        throw new Error("You're not authorized");
      }
      const verifyUser = jwtHelper.verifyToken(token, config.jwt.secret!);
      req.user = verifyUser;
      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new Error("You're not authorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
