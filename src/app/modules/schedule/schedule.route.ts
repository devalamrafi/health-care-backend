import { UserRole } from "@prisma/client";
import { scheduleController } from "./schedule.controller";
import { auth } from "../../helper/auth";

const router = require("express").Router();


router.get("/get-all-schedules", auth(UserRole.DOCTOR),auth(UserRole.ADMIN), scheduleController.getAllSchedulesForDoctor);
router.post("/create-schedule", scheduleController.insertIntoDB);
router.delete("/delete-schedule/:id", scheduleController.deleteScheduleFromDB);

export const scheduleRoutes = {
  router,
};
