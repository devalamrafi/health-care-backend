import { scheduleController } from "./schedule.controller";

const router = require("express").Router();


router.get("/get-all-schedules",scheduleController.getAllSchedulesForDoctor);
router.post("/create-schedule", scheduleController.insertIntoDB);
router.delete("/delete-schedule/:id", scheduleController.deleteScheduleFromDB);

export const scheduleRoutes = {
  router,
};
