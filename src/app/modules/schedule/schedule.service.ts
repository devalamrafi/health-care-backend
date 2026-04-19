import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../shared/prisma";
import { pagintaionHelper } from "../../helper/paginationHelper";
import { Prisma } from "@prisma/client";
import { IJwtPayload } from "../../types/common";

const insertIntoDB = async (data: any) => {
  const { startTime, endTime, startDate, endDate } = data;
  console.log(data);

  const intervalTime = 30;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  const schedules = [];
  console.log(currentDate);
  console.log(lastDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]),
        ),
        Number(startTime.split(":")[1]),
      ),
    );
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]),
        ),
        Number(endTime.split(":")[1]),
      ),
    );

    console.log(startDateTime, endDateTime);

    while (startDateTime < endDateTime) {
      const slotStartDateTime = startDateTime;
      const slotEndDateTime = addMinutes(slotStartDateTime, intervalTime);

      const scheduleData = {
        startDateTime: slotStartDateTime,
        endDateTime: slotEndDateTime,
        // Add other necessary fields here
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        console.log("Schedule created:", result);
        schedules.push(result);
      }

      slotStartDateTime.setMinutes(
        slotStartDateTime.getMinutes() + intervalTime,
      );
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllSchedulesForDoctor = async (
  user: IJwtPayload,
  filters: any,
  options: any,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    pagintaionHelper.calculatePagination(options);
  const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } =
    filters;
  const andConditions: Prisma.ScheduleWhereInput[] = [];

  const whereCondition: Prisma.ScheduleWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
    select: {
      scheduleId: true,
    },
  });

  const doctorScheduleIds = doctorSchedules.map((ds) => ds.scheduleId);

  if (filterStartDateTime && filterEndDateTime) {
    andConditions.push({
      AND: [
        {
          startDateTime: {
            gte: filterStartDateTime,
          },
        },
        {
          endDateTime: {
            lte: filterEndDateTime,
          },
        },
      ],
    });
  }
  const result = await prisma.schedule.findMany({
    where: {
      ...whereCondition,
      id: {
        notIn: doctorScheduleIds,
      },
    },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.schedule.count({
    where: {
      ...whereCondition,
      id: {
        notIn: doctorScheduleIds,
      },
    },
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteScheduleFromDB = async (id: string) => {
  const result = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  return result;
};

export const scheduleService = {
  insertIntoDB,
  getAllSchedulesForDoctor,
  deleteScheduleFromDB,
};
