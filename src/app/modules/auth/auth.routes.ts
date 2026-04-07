import { AuthController,  } from "./auth.controller";

const router = require("express").Router();

router.post(
  "/login",
  AuthController.login
);

export const authRoutes = {
  router,
};
