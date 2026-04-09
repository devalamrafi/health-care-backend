import { Request } from "express";
import prisma from "../../shared/prisma";
import { ICreateDoctor, ICreatePatient } from "../../types/user.interface";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import config from "../../../config";

const createPatient = async (req: Request) => {
  // console.log(req.body)
  if (req.file) {
    const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = uploadedResult?.secure_url;
  }
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(config.password_salt_rounds),
  );
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: req.body.patient as ICreatePatient,
    });
  });
  return result;
};

const createDoctor = async (req: Request) => {

  if (req.file) {
    const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.doctor.profilePhoto = uploadedResult?.secure_url;
  }
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(config.password_salt_rounds),
  );
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.doctor.email,
        password: hashedPassword,
      },
    });

    return await tnx.doctor.create({
      data: req.body.doctor as Parameters<typeof tnx.doctor.create>[0]['data'],
    });
  });
  return result;
};

const createAdmin = async (req: Request) => {

  if (req.file) {
    const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.profilePhoto = uploadedResult?.secure_url;
  }
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(config.password_salt_rounds),
  );
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.admin.email,
        password: hashedPassword,
      },
    });

    return await tnx.admin.create({
      data: req.body.admin as Parameters<typeof tnx.admin.create>[0]['data'],
    });
  });
  return result;
};

const getAllFromDB = async ({ page, limit }: { page: number; limit: number }) => {
  console.log(page, limit)
  const skip = (page - 1) * limit;
  const result = await prisma.user.findMany({
    skip,
    take: limit,
  });
  return result;
}

export const userService = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDB
};
