import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { doctorScheduleService } from "./doctorSchedule.service";

const createDoctorSchedule = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { user } = req;
    const result = await doctorScheduleService.createDoctorSchedule(
      user,
      req.body,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Doctor schedule inserted successfully",
      data: result,
    });
  },
);

export const doctorScheduleController = {
  createDoctorSchedule,
};
