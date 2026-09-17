export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido"
        });
    }

    const { messages } = req.body;

    if (!messages) {
        return res.status(400).json({
            error: "Faltan los mensajes"
        });
    }

    return res.status(200).json({
        message: "La función recibió correctamente los mensajes."
    });
}