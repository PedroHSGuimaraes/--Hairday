import { fetchScheduleByDay } from "../../services/schedule-fetch-by-day.js";
import { hoursLoad } from "../form/hours-load.js";

const selectDate = document.getElementById("date");

async function scheduleDay() {
  try {
    const date = selectDate.value;
    console.log("Data selecionada:", date);

    const dailySchedules = await fetchScheduleByDay({ date });
    console.log("Agendamentos do dia:", dailySchedules);

    // Atualiza os horários disponíveis
    hoursLoad({ date });

    // Aqui você pode adicionar código para atualizar a interface com os agendamentos
    // Por exemplo, atualizar as listas de agendamentos por período
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }
}

export { scheduleDay };
