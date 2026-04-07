import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginService(req.body);

  const { accessToken, refreshToken, needPasswordChange } = result;
  res.cookie("accesToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60, // 1 hour
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 90, // 7 days
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
      data: {
          needPasswordChange: needPasswordChange,
    },
    message: "User logged in successfully",
  });
});

export const AuthController = {
  login,
};
