import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes.router,
  },
  {
    path: "/auth",
    route: authRoutes.router,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
