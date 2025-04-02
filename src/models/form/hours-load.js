import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";




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

    if (hour === "9:00") {
      hoursHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hoursHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hoursHeaderAdd("Noite");
    }

    hours.appendChild(hourElement);
  });


  hoursClick()
}

function hoursHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;
  hours.appendChild(header);
}

export { hoursLoad };
