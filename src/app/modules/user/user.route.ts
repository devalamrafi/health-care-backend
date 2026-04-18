import { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { UserRole } from "@prisma/client";
import { auth } from "../../helper/auth";

const router = require("express").Router();

router.get("/", auth(UserRole.ADMIN), userController.getAllFromDB);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    userController.createPatient(req, res, next);
  },
);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    userController.createDoctor(req, res, next);
  },
);
router.post(
  "/create-admin",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    userController.createAdmin(req, res, next);
  },
);

export const userRoutes = {
  router,
};
