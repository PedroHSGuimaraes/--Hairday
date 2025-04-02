import { Modal } from "../../components/Modal.js";
import dayjs from "dayjs";

// Cria uma instância do modal
const modal = new Modal();

export async function scheduleNew({ name, hour, when }) {
  try {
    // Formata a data para o formato esperado pela API
    const formattedDate = dayjs(when).format("YYYY-MM-DD");

    const response = await fetch(`http://localhost:3333/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        hour,
        date: formattedDate,
        when: when.toISOString(), // Garante que a data seja enviada no formato ISO
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar agendamento");
    }

    const data = await response.json();
    modal.show("Agendamento criado com sucesso!");
    return data;
  } catch (error) {
    modal.show(`
      Não foi possível criar o agendamento.
      
      Detalhes do erro:
      ${error.message}
      
      Por favor, tente novamente mais tarde.
    `);
    throw error; // Re-lança o erro para que possa ser tratado pelo componente que chamou esta função
  }
}
