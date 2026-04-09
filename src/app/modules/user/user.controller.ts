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
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: "Admin created successfully",
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const {page,limit, searchTerm, sortBy, sortOrder} = req.query
  const result = await userService.getAllFromDB({page: Number(page), limit: Number(limit), searchTerm: String(searchTerm), sortBy: String(sortBy), sortOrder: String(sortOrder)});

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "User retrieved successfully",
  });
});

export const userController = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDB,
};
