import { Modal } from "../../components/Modal.js";
import dayjs from "dayjs";

// Cria uma instância do modal
const modal = new Modal();

export async function scheduleNew({ id, name, hour, when }) {
  try {
    // Formata a data para o formato esperado pela API
    const formattedDate = dayjs(when).format("YYYY-MM-DD");

    console.log("Dados sendo enviados:", {
      id,
      name,
      hour,
      date: formattedDate,
      when: when.toISOString(),
    });

    const response = await fetch(`http://localhost:3333/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        hour,
        date: formattedDate,
        when: when.toISOString(), // Garante que a data seja enviada no formato ISO
      }),
    });

    console.log("Status da resposta:", response.status);

    if (!response.ok) {
      throw new Error("Erro ao criar agendamento");
    }

    const data = await response.json();
    console.log("Dados recebidos da API:", data);

    modal.show("Agendamento criado com sucesso!");
    return data;
  } catch (error) {
    console.error("Erro completo:", error);
    modal.show(`
      Não foi possível criar o agendamento.
      
      Detalhes do erro:
      ${error.message}
      
      Por favor, tente novamente mais tarde.
    `);
    throw error; // Re-lança o erro para que possa ser tratado pelo componente que chamou esta função
  }
}
