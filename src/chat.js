import { transformarMensajes } from "./utils.js";

// =========================
// Historial del chat
// =========================

let mensajes = JSON.parse(
    sessionStorage.getItem("mensajes-joker")
) || [];

// =========================
// Guardar historial
// =========================

function guardarMensajes() {
    sessionStorage.setItem(
        "mensajes-joker",
        JSON.stringify(mensajes)
    );
}

// =========================
// Agregar mensaje
// =========================

function agregarMensaje(remitente, contenido) {
    mensajes.push({
        remitente,
        contenido
    });

    guardarMensajes();
}

// =========================
// Renderizar mensajes
// =========================

function renderizarMensajes(contenedor) {
    contenedor.innerHTML = "";

    mensajes.forEach((mensaje) => {
        const div = document.createElement("div");

        div.classList.add("mensaje", mensaje.remitente);

        const p = document.createElement("p");

        p.textContent = mensaje.contenido;

        div.appendChild(p);

        contenedor.appendChild(div);
    });

    contenedor.scrollTop = contenedor.scrollHeight;
}

// =========================
// Mostrar estado de carga
// =========================

function mostrarEscribiendo(contenedor) {
    const div = document.createElement("div");

    div.classList.add("mensaje", "personaje");
    div.id = "escribiendo";

    div.innerHTML = `
    <p class="typing">
      <span></span>
      <span></span>
      <span></span>
    </p>
  `;

    contenedor.appendChild(div);

    contenedor.scrollTop = contenedor.scrollHeight;
}

// =========================
// Quitar estado de carga
// =========================

function quitarEscribiendo() {
    const escribiendo = document.querySelector("#escribiendo");

    if (escribiendo) {
        escribiendo.remove();
    }
}

// =========================
// Consultar Gemini
// =========================

async function consultarGemini() {
    const response = await fetch("/api/functions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: transformarMensajes(mensajes)
        })
    });

    if (!response.ok) {
        const error = new Error("Error al comunicarse con Gemini");

        error.status = response.status;

        throw error;
    }

    const data = await response.json();

    return data.message;
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

    // Mostrar historial guardado
    renderizarMensajes(contenedor);

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const contenido = input.value.trim();

        if (!contenido) {
            return;
        }

        const boton = formulario.querySelector("button");

        boton.disabled = true;

        agregarMensaje("usuario", contenido);

        renderizarMensajes(contenedor);

        input.value = "";

        try {
            mostrarEscribiendo(contenedor);

            const respuesta = await consultarGemini();

            quitarEscribiendo();

            agregarMensaje("personaje", respuesta);

            renderizarMensajes(contenedor);

        } catch (error) {
            quitarEscribiendo();

            console.error(error);

            let mensajeError =
                "Algo salió mal... intenta de nuevo.";

            if (error.status === 503) {
                mensajeError =
                    "El Joker está demasiado ocupado ahora mismo. Intenta nuevamente en unos segundos.";
            }

            agregarMensaje("personaje", mensajeError);

            renderizarMensajes(contenedor);

        } finally {
            boton.disabled = false;
        }
    });
}

export { inicializarChat };