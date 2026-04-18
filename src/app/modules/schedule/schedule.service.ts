import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../shared/prisma";

const insertIntoDB = async (data: any) => {
  const { startTime, endTime, startDate, endDate } = data;
  console.log(data);

  const intervalTime = 30;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);


    const schedules = [];
    console.log(currentDate)
    console.log(lastDate)

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
      
      console.log(startDateTime, endDateTime)

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
export const scheduleService = {
  insertIntoDB,
};
