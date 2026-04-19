import { scheduleController } from "./schedule.controller";

const router = require("express").Router();


router.get("/get-all-schedules",scheduleController.getAllSchedulesForDoctor);
router.post("/create-schedule",scheduleController.insertIntoDB);

export const scheduleRoutes = {
  router,
};
