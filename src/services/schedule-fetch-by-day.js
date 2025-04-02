import dayjs from "dayjs";
import { Modal } from "../components/Modal.js";

// Cria uma instância do modal
const modal = new Modal();

async function fetchScheduleByDay({ date }) {
  try {
    console.log("Buscando agendamentos para a data:", date);

    const response = await fetch(`http://localhost:3333/schedules`);

    if (!response.ok) {
      throw new Error("Erro ao buscar agendamentos");
    }

    const data = await response.json();
    console.log("Todos os agendamentos:", data);

    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(dayjs(schedule.when), "date")
    );

    console.log("Agendamentos filtrados para o dia:", dailySchedules);
    return dailySchedules;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    modal.show(
      "Não foi possível buscar o agendamento. Por favor, tente novamente mais tarde."
    );
    return [];
  }
}

export { fetchScheduleByDay };
