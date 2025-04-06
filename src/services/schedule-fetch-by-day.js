import dayjs from "dayjs";
import { Modal } from "../components/Modal.js";

// Cria uma instância do modal
const modal = new Modal();

async function fetchScheduleByDay({ date }) {
  try {
    console.log("Buscando agendamentos para a data:", date);

    // A rota correta é /schedules conforme definido no server.json
    const response = await fetch(`http://localhost:3333/schedules`);

    if (!response.ok) {
      // Mensagem de erro mais específica baseada no status HTTP
      throw new Error(
        `Erro ao buscar agendamentos: ${response.status} - ${response.statusText}`
      );
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

    // Verifica se o erro é de conexão (comum durante o carregamento inicial da página)
    // Se for um erro relacionado à conexão, não mostra o modal
    if (!navigator.onLine || error.name === "TypeError") {
      console.warn(
        "Problema de conexão detectado, tentando novamente em 2 segundos..."
      );

      // Tenta novamente após 2 segundos
      setTimeout(() => {
        fetchScheduleByDay({ date });
      }, 2000);

      return [];
    }

    // Somente mostra o modal para outros tipos de erro
    modal.show(
      "Não foi possível buscar o agendamento. Por favor, tente novamente mais tarde."
    );
    return [];
  }
}

export { fetchScheduleByDay };
