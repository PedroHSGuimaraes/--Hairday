import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";

const hours = document.getElementById("hours");
function hoursLoad() {
  hours.innerHTML = "";
  // Mapeia os horários de funcionamento e verifica se já passaram
  const opening = openingHours.map((hour) => {
    // Extrai a hora do horário (exemplo: de "9:00" pega apenas o "9")
    const [scheduleHour] = hour.split(":");
    
    // Verifica se o horário já passou
    // Compara se o horário atual é depois do horário do agendamento
    const isHourPast = dayjs().isAfter(dayjs().hour(scheduleHour).minute(0));

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
    hours.appendChild(hourElement);
  });
}

export { hoursLoad };
