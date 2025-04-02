import dayjs from "dayjs";
import { Modal } from "../../components/Modal.js";
import { scheduleNew } from "../schedules/schedule-new.js";
// Cria uma instância do modal
const modal = new Modal();

const form = document.querySelector("form");
const selectDate = document.getElementById("date");
const clientName = document.getElementById("client");
const todayImput = dayjs(new Date()).format("YYYY-MM-DD");

selectDate.value = todayImput;
selectDate.min = todayImput;

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const name = clientName.value.trim();
    if (!name) {
      modal.show("Nome é obrigatório");
      return;
    }
    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      modal.show("Horário é obrigatório");
      return;
    }

    const hour = hourSelected.innerText;
    const when = dayjs(selectDate.value)
      .hour(parseInt(hour.split(":")[0]))
      .minute(0);
    const id = new Date().getTime(); // Gera um ID único baseado no timestamp

    await scheduleNew({ id, name, hour, when });
  } catch (error) {
    modal.show(`
      Não foi possível fazer o agendamento.
    
      Por favor, tente novamente mais tarde.
    `);
  }
};
