import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userFilterableFileds } from "./user.constant";
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
  //page, limit, sortBy, sortOrder -- pagination, sorting
  //searchTerms, fields, searching, filtering

  const filters = pick(req.query, userFilterableFileds);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    meta: result.meta,
    data: result.data,
    message: "User retrieved successfully",
  });
});

export const userController = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDB,
};
