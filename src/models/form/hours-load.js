import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

function hoursLoad({ date }) {
  hours.innerHTML = "";

  // Converte a data selecionada para objeto dayjs
  const selectedDate = dayjs(date);
  const today = dayjs();

  // Mapeia os horários de funcionamento e verifica se já passaram
  const opening = openingHours.map((hour) => {
    // Extrai a hora do horário (exemplo: de "9:00" pega apenas o "9")
    const [scheduleHour] = hour.split(":");

    // Cria um objeto dayjs com a data selecionada e o horário
    const scheduleDateTime = selectedDate.hour(scheduleHour).minute(0);

    // Verifica se o horário já passou
    // Se for o dia atual, verifica se o horário já passou
    // Se for um dia futuro, todos os horários estão disponíveis
    const isHourPast =
      selectedDate.isSame(today, "day") && today.isAfter(scheduleDateTime);

    return {
      hour,
      // Inverte a lógica: disponível apenas se o horário NÃO passou
      available: !isHourPast,
    };
  });

  // Cria os elementos de horário na interface
  opening.forEach(({ hour, available }) => {
    const hourElement = document.createElement("li");
    hourElement.textContent = hour;
    hourElement.classList.add("hour");
    hourElement.classList.add(
      available ? "hour-available" : "hour-unavailable"
    );

    if (hour === "9:00") {
      hoursHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hoursHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hoursHeaderAdd("Noite");
    }

    hours.appendChild(hourElement);
  });

  hoursClick();
}

function hoursHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;
  hours.appendChild(header);
}

export { hoursLoad };
