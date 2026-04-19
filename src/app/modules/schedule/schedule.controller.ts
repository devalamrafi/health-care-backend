import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { scheduleService } from "./schedule.service";
import pick from "../../helper/pick";
import { IJwtPayload } from "../../types/common";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule inserted successfully",
    data: result,
  });
});
const getAllSchedulesForDoctor = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const filters = pick(req.query, ["startDateTime", "endDateTime"]);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const {user} = req

    const result = await scheduleService.getAllSchedulesForDoctor(
      user as IJwtPayload,
      filters,
      options,


    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  },
);

export const deleteScheduleFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await scheduleService.deleteScheduleFromDB(String(id));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule deleted successfully",
      data: result,
    });
  }
);

export const scheduleController = {
  insertIntoDB,
  getAllSchedulesForDoctor,
  deleteScheduleFromDB,
};
