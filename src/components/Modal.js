/**
 * Componente Modal para exibir mensagens ao usuário
 * Este componente cria um modal elegante que pode ser usado para substituir os alerts
 */

export class Modal {
  constructor() {
    // Cria o elemento do modal
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;

    // Adiciona o modal ao body do documento
    document.body.appendChild(this.modal);

    // Adiciona os estilos necessários
    this.addStyles();

    // Configura os event listeners
    this.setupEventListeners();
  }

  /**
   * Adiciona os estilos CSS necessários para o modal
   */
  addStyles() {
    const style = document.createElement("style");
    style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
            }

            .modal-content {
                background-color: #19181b;
                margin: 15% auto;
                padding: 20px;
                border-radius: 8px;
                width: 80%;
                max-width: 500px;
                position: relative;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                color: white;
            }

            .close {
                color: #ffffff;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                position: absolute;
                right: 20px;
                top: 10px;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }

            .close:hover {
                opacity: 1;
            }

            .modal-body {
                margin-top: 20px;
                font-size: 16px;
                line-height: 1.5;
                color: #ffffff;
                text-align: center;
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Configura os event listeners para fechar o modal
   */
  setupEventListeners() {
    const closeBtn = this.modal.querySelector(".close");
    closeBtn.onclick = () => this.hide();

    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.hide();
      }
    };
  }

  /**
   * Exibe o modal com a mensagem especificada
   * @param {string} message - A mensagem a ser exibida no modal
   */
  show(message) {
    this.modal.querySelector(".modal-body").textContent = message;
    this.modal.style.display = "block";
  }

  /**
   * Esconde o modal
   */
  hide() {
    this.modal.style.display = "none";
  }
}
