import { scheduleController } from "./schedule.controller";

const router = require("express").Router();



router.post("/create-schedule",scheduleController.insertIntoDB);

export const scheduleRoutes = {
  router,
};
