import { describe, test, expect } from "vitest";

import {
    transformarMensajes,
    mensajeValido
} from "../src/utils.js";

// =========================
// Tests de transformarMensajes
// =========================

describe("transformarMensajes", () => {

    test("convierte usuario al formato de Gemini", () => {
        const mensajes = [
            {
                remitente: "usuario",
                contenido: "Hola Joker"
            }
        ];

        const resultado = transformarMensajes(mensajes);

        expect(resultado).toEqual([
            {
                role: "user",
                content: "Hola Joker"
            }
        ]);
    });

    test("convierte personaje al formato de Gemini", () => {
        const mensajes = [
            {
                remitente: "personaje",
                contenido: "¡Hola, Batsy!"
            }
        ];

        const resultado = transformarMensajes(mensajes);

        expect(resultado).toEqual([
            {
                role: "model",
                content: "¡Hola, Batsy!"
            }
        ]);
    });

});

// =========================
// Tests de mensajeValido
// =========================

describe("mensajeValido", () => {

    test("acepta un mensaje con contenido", () => {
        expect(mensajeValido("Hola Joker")).toBe(true);
    });

    test("rechaza un mensaje vacío", () => {
        expect(mensajeValido("")).toBe(false);
    });

});