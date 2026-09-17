// =========================
// Historial del chat
// =========================

const mensajes = [];

// =========================
// Agregar mensaje
// =========================

function agregarMensaje(remitente, contenido) {
    mensajes.push({
        remitente,
        contenido
    });
}

// =========================
// Renderizar mensajes
// =========================

function renderizarMensajes(contenedor) {
    contenedor.innerHTML = "";

    mensajes.forEach((mensaje) => {
        const div = document.createElement("div");

        div.classList.add("mensaje", mensaje.remitente);

        div.innerHTML = `
      <p>${mensaje.contenido}</p>
    `;

        contenedor.appendChild(div);
    });

    contenedor.scrollTop = contenedor.scrollHeight;
}

// =========================
// Respuesta temporal del Joker
// =========================

function responderJoker(contenedor) {
    setTimeout(() => {
        agregarMensaje(
            "personaje",
            "¿Eso es todo lo que tienes para decirme? Ja... interesante."
        );

        renderizarMensajes(contenedor);
    }, 700);
}

// =========================
// Inicializar chat
// =========================

function inicializarChat() {
    const contenedor = document.querySelector("#chat");
    const formulario = document.querySelector("#form-chat");
    const input = document.querySelector("#mensaje-input");

    if (!contenedor || !formulario || !input) {
        return;
    }

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const contenido = input.value.trim();

        if (!contenido) {
            return;
        }

        agregarMensaje("usuario", contenido);

        renderizarMensajes(contenedor);

        input.value = "";

        responderJoker(contenedor);
    });
}

export { inicializarChat };