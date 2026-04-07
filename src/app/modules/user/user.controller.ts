import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";
import { Request, Response } from "express";

const createPatient = catchAsync(async (req: Request, res: Response) => {

  const result = await userService.createPatient(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: "Patient created successfully",
  });
});
const createDoctor = catchAsync(async (req: Request, res: Response) => {

  const result = await userService.createDoctor(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: "Patient created successfully",
  });
});

export const userController = {
  createPatient,
  createDoctor
};
