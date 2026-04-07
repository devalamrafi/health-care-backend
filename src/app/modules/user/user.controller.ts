import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";
import { Request, Response } from "express";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req.body);
  console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "User created successfully",
  });
});

export const userController = {
  createPatient,
};
