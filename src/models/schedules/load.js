import { fetchScheduleByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "../schedules/show.js";
import { hoursLoad } from "../form/hours-load.js";
import { Modal } from "../../components/Modal.js";

const selectDate = document.getElementById("date");

console.log("Elemento de data encontrado:", selectDate);

async function scheduleDay() {
  try {
    if (!selectDate) {
      console.error("Elemento de data não encontrado");
      return;
    }

    const date = selectDate.value;
    console.log("Data selecionada para busca:", date);

    if (!date) {
      console.warn("Nenhuma data selecionada");
      return;
    }

    console.log("Iniciando busca de agendamentos para a data:", date);
    const dailySchedules = await fetchScheduleByDay({ date });
    console.log("Agendamentos retornados da API:", dailySchedules);

    if (!Array.isArray(dailySchedules)) {
      console.error("Resposta inválida da API:", dailySchedules);
      return;
    }

    console.log(
      "Chamando função de exibição com os agendamentos:",
      dailySchedules
    );
    scheduleShow({ dailySchedules });

    console.log("Atualizando horários disponíveis");
    hoursLoad({ date });

    // Aqui você pode adicionar código para atualizar a interface com os agendamentos
    // Por exemplo, atualizar as listas de agendamentos por período
  } catch (error) {
    console.error("Erro detalhado ao carregar agendamentos:", error);
    Modal.show({
      title: "Erro",
      message: "Erro ao carregar agendamentos: " + error.message,
      type: "error",
    });
  }
}

export { scheduleDay };
