const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/whatsapp", async (req, res) => {
  try {

    const { telefono, nombre } = req.body;

    const response = await axios.post(
      "https://graph.facebook.com/v19.0/996052293598272/messages",
      {
        messaging_product: "whatsapp",
        to: telefono,
        type: "template",
        template: {
          name: "recordatorio_turno",
          language: { code: "es_AR" }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ WhatsApp enviado");

    res.json(response.data);

  } catch (error) {

    console.log("❌ Error:", error.response?.data || error.message);

    res.status(500).json(error.response?.data);
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo");
});