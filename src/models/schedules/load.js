import { hoursLoad } from "../form/hours-load.js";
const selectDate = document.getElementById("date");
function scheduleDay() {
  const date = selectDate.value;
  hoursLoad({ date });
}

export { scheduleDay };
