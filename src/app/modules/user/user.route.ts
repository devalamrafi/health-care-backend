import { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = require("express").Router();

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

export const userRoutes = {
  router,
};
