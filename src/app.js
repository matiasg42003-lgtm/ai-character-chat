import { inicializarChat } from "./chat.js";
const app = document.querySelector("#app");

// =========================
// Vistas
// =========================

function renderHome() {
  app.innerHTML = `
    <section class="hero">

      <div class="hero-makeup" aria-hidden="true">
        <span class="maquillaje-ojo"></span>
        <span class="maquillaje-sonrisa"></span>
      </div>

      <div class="hero-content">

        <span class="hero-label">
          AI CHARACTER CHAT
        </span>

        <h2>
          Why so
          <span>serious?</span>
        </h2>

        <p class="hero-description">
          Entrá en una conversación impredecible con una versión
          artificial del Joker.
        </p>

        <button data-link href="/chat" class="hero-button">
          Comenzar a chatear
          <span aria-hidden="true">→</span>
        </button>

      </div>

    </section>
  `;
}



function renderChat() {
  app.innerHTML = `
    <section class="chat-view">

      <div class="chat-header">

        <div class="chat-avatar">
          J
        </div>

        <div>
          <h2>Joker</h2>
          <span class="chat-status">
            ● ONLINE
          </span>
        </div>

      </div>

      <section id="chat"></section>

      <form id="form-chat">

        <input
          type="text"
          id="mensaje-input"
          placeholder="Decile algo al Joker..."
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
    <section class="about-view">

      <span class="about-label">
        THE PROJECT
      </span>

      <h2>
        Behind the
        <span>chaos.</span>
      </h2>

      <p class="about-description">
        Joker AI Chat es una aplicación web desarrollada como una
        experiencia de conversación con inteligencia artificial.
        El proyecto combina una SPA, una API de Gemini y una interfaz
        inspirada en la estética del Joker.
      </p>

      <div class="about-grid">

        <article class="about-card">
          <span>01</span>
          <h3>SPA</h3>
          <p>
            Navegación entre Home, Chat y About utilizando History API
            sin recargar la página.
          </p>
        </article>

        <article class="about-card">
          <span>02</span>
          <h3>AI</h3>
          <p>
            Gemini genera las respuestas manteniendo el contexto de
            la conversación durante la sesión.
          </p>
        </article>

        <article class="about-card">
          <span>03</span>
          <h3>SERVERLESS</h3>
          <p>
            La API key permanece protegida en el entorno de Vercel y
            no se expone en el frontend.
          </p>
        </article>

      </div>

      <a href="/home" data-link class="about-button">
        ← Volver al inicio
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