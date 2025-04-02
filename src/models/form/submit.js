import dayjs from "dayjs";
import { Modal } from "../../components/Modal.js";

// Cria uma instância do modal
const modal = new Modal();

const form = document.querySelector("form");
const selectDate = document.getElementById("date");
const clientName = document.getElementById("client");
const todayImput = dayjs(new Date()).format("YYYY-MM-DD");

selectDate.value = todayImput;
selectDate.min = todayImput;

form.onsubmit = (event) => {
  event.preventDefault();

  try {
    const name = clientName.value.trim();
    if (!name) {
      modal.show("Nome é obrigatório");
    }
    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      modal.show("Horário é obrigatório");
    }

    const [hour] = hourSelected.innerText.split(":");

    const when = dayjs(selectDate.value).add(hour, "hour");
    const id = new Date().getTime();

    console.log({ id, name, hour, when });
  } catch (error) {
    modal.show(`
      Não foi possível fazer o agendamento.
    
      Por favor, tente novamente mais tarde.
    `);
  }
};
