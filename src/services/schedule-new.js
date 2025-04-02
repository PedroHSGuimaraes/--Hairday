import { apiConfig } from "./api-config.js";
import { Modal } from "../components/Modal.js";
async function scheduleNew({ id, name, when }) {
  try {
    await fetch(`${apiConfig.baseUrl}/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, when }),
    });
    Modal.show("Agendamento realizado com sucesso!");
  } catch (error) {
    console.error(error);
    Modal.show(
      "Não foi possível fazer o agendamento. Por favor, tente novamente mais tarde."
    );
  }
}

export { scheduleNew };
