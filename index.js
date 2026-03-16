const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// ===== CONFIG =====
const PHONE_NUMBER_ID = "996052293598272"; // poné tu ID acá

// ===== ENDPOINT =====
app.post("/whatsapp", async (req, res) => {

  try {

    const { telefono, nombre, servicio, fecha, hora } = req.body;

    console.log("📩 Datos recibidos:", req.body);

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: telefono,
        type: "template",
        template: {
          name: "recordatorio_turno",
          language: {
            code: "es_AR"
          },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: nombre },
                { type: "text", text: servicio },
                { type: "text", text: fecha },
                { type: "text", text: hora }
              ]
            }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ WhatsApp enviado:", response.data);

    res.json(response.data);

  } catch (error) {

    console.log("❌ Error:", error.response?.data || error.message);

    res.status(500).json(error.response?.data || { error: error.message });
  }

});

// ===== SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});