import prisma from "../../shared/prisma";
import bcrypt from "bcryptjs";
import config from "../../../config";
import { UserStatus } from "@prisma/client";
import { jwtHelper } from "../../helper/jwtHelper";

const loginService = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwtHelper.generateToken( { email: user.email, role: user.role }, config.jwt.secret!, config.jwt.expiresIn! );
  const refreshToken = jwtHelper.generateToken( { email: user.email, role: user.role }, config.jwt.refreshSecret!, config.jwt.refreshExpiresIn! );

    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange,
    }
    
};

export const authService = {
  loginService,
};
