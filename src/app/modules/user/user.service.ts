import prisma from "../../shared/prisma";
import { ICreatePatient } from "../../types/user.interface";
import bcrypt from "bcryptjs";

const createPatient = async (payload: ICreatePatient) => {
  const hashedPassword = await bcrypt.hash(payload.password, process.env.PASSWORD_SALT_ROUNDS as unknown as number);
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: {
        email: payload.email,
        name: payload.name,
      },
    });
  });
  return result;
};

export const userService = {
  createPatient,
};
