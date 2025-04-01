import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";


function hoursLoad() {
  const opening = openingHours.map((hour) => {
    const [sheduleHour] = hour.split(":");
  
    const isHourPast = dayjs(date).add(sheduleHour, "hour").isBefore(dayjs());
  
  return {
    hour,
      available: isHourPast,
    };
  });

  console.log(opening);
}

export { hoursLoad };
