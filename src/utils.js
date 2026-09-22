// =========================
// Transformar mensajes
// =========================

function transformarMensajes(mensajes) {
    return mensajes.map((mensaje) => ({
        role: mensaje.remitente === "usuario" ? "user" : "model",
        content: mensaje.contenido
    }));
}

// =========================
// Validar mensaje
// =========================

function mensajeValido(contenido) {
    return contenido.trim().length > 0;
}

export {
    transformarMensajes,
    mensajeValido
};