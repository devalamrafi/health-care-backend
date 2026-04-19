import { UserRole } from "@prisma/client";
import { auth } from "../../helper/auth";
import { doctorScheduleController } from "./doctorSchedule.controller";

const router = require("express").Router();

router.post(
  "/create",
  auth(UserRole.DOCTOR),
  doctorScheduleController.createDoctorSchedule,
);

export const doctorScheduleRoutes = {
  router,
};
