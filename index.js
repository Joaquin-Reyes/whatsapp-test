const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// ===== CONFIGURACIÓN =====
const PHONE_NUMBER_ID = "996052293598272";

// ===== ENDPOINT =====
app.post("/whatsapp", async (req, res) => {
  try {

    const { telefono } = req.body;

    console.log("📩 Teléfono recibido:", telefono);

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: telefono,
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US"
          }
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

    res.json({
      status: "ok",
      data: response.data
    });

  } catch (error) {

    console.log("❌ Error:", error.response?.data || error.message);

    res.status(500).json({
      status: "error",
      error: error.response?.data || error.message
    });

  }
});

// ===== SERVIDOR =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});