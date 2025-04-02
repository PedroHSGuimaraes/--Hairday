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
    console.log(" name:", name);
  } catch (error) {
    console.log(error);
    modal.show(`
      Não foi possível fazer o agendamento.
    
      Por favor, tente novamente mais tarde.
    `);
  }
};
