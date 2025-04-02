import { scheduleDay } from "../schedules/load.js";

const selectDate = document.getElementById("date");

selectDate.onchange = () => scheduleDay();
