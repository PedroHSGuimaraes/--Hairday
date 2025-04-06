import dayjs from "dayjs";

import { Modal } from "../../components/Modal.js";

// Adicionando logs para debug dos elementos do DOM
console.log("Elementos do DOM:", {
  periodMorning: document.querySelector("#period-morning"),
  periodAfternoon: document.querySelector("#period-afternoon"),
  periodNight: document.querySelector("#period-night"),
});

const periodMorning = document.querySelector("#period-morning");
const periodAfternoon = document.querySelector("#period-afternoon");
const periodNight = document.querySelector("#period-night");

function scheduleShow({ dailySchedules }) {
  try {
    console.log("Iniciando renderização dos agendamentos:", dailySchedules);

    if (!periodMorning || !periodAfternoon || !periodNight) {
      console.error("Elementos do DOM não encontrados:", {
        periodMorning,
        periodAfternoon,
        periodNight,
      });
      return;
    }

    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    if (!Array.isArray(dailySchedules) || dailySchedules.length === 0) {
      console.log("Nenhum agendamento encontrado para o dia");
      return;
    }

    dailySchedules.forEach((schedule) => {
      console.log("Processando agendamento:", schedule);

      const item = document.createElement("li");
      const time = document.createElement("strong");
      const name = document.createElement("span");

      item.setAttribute("data-id", schedule.id);

      time.textContent = dayjs(schedule.when).format("HH:mm");
      name.textContent = schedule.name;

      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
      cancelIcon.setAttribute("alt", "Cancelar");

      item.append(time, name, cancelIcon);

      const hour = dayjs(schedule.when).hour();
      console.log("Hora do agendamento:", hour);

      if (hour <= 12) {
        console.log("Adicionando ao período da manhã");
        periodMorning.appendChild(item);
      } else if (hour > 12 && hour <= 18) {
        console.log("Adicionando ao período da tarde");
        periodAfternoon.appendChild(item);
      } else {
        console.log("Adicionando ao período da noite");
        periodNight.appendChild(item);
      }
    });
  } catch (error) {
    console.error("Erro detalhado ao mostrar agendamentos:", error);
    Modal.show({
      title: "Erro",
      message: "Erro ao mostrar agendamentos: " + error.message,
      type: "error",
    });
  }
}

export { scheduleShow };
