import { inicializarChat } from "./chat.js";
const app = document.querySelector("#app");

// =========================
// Vistas
// =========================

function renderHome() {
  app.innerHTML = `
    <section>
      <h2>Bienvenido al Joker AI Chat</h2>
      <p>
        ¿Te animás a tener una conversación con uno de los personajes
        más impredecibles?
      </p>

      <button data-link href="/chat">
        Comenzar a chatear
      </button>
    </section>
  `;
}

function renderChat() {
  app.innerHTML = `
    <section class="chat-view">

      <h2>Chat con Joker</h2>

      <section id="chat"></section>

      <form id="form-chat">

        <input
          type="text"
          id="mensaje-input"
          placeholder="Escribe un mensaje..."
          autocomplete="off"
        >

        <button type="submit">
          Enviar
        </button>

      </form>

    </section>
  `;

  inicializarChat();
}

function renderAbout() {
  app.innerHTML = `
    <section>
      <h2>Sobre el proyecto</h2>
      <p>
        Joker AI Chat es una aplicación SPA que utiliza inteligencia
        artificial para simular una conversación con el personaje.
      </p>

      <a href="/home" data-link>
        Volver al inicio
      </a>
    </section>
  `;
}

// =========================
// Router
// =========================

function router() {
  const path = window.location.pathname;

  if (path === "/home" || path === "/") {
    renderHome();
  } else if (path === "/chat") {
    renderChat();
  } else if (path === "/about") {
    renderAbout();
  } else {
    renderHome();
  }
}

// =========================
// Navegación SPA
// =========================

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");

  if (!link) return;

  event.preventDefault();

  const path = link.getAttribute("href");

  history.pushState({}, "", path);

  router();
});

// =========================
// Atrás / Adelante
// =========================

window.addEventListener("popstate", router);

// Render inicial

router();