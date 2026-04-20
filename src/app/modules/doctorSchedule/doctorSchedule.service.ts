import prisma from "../../shared/prisma";
import { IJwtPayload } from "../../types/common";

const createDoctorSchedule = async (user: IJwtPayload, payload: {
  scheduleIds:string[];
}) => {

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  const result = await prisma.doctorSchedule.createMany({
    data: doctorScheduleData,
  });


  return result

};

export const doctorScheduleService = {
  createDoctorSchedule,
};
