const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// ===== CONFIG =====
const PHONE_NUMBER_ID = "996052293598272";

// ===== TEST ENDPOINT =====
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// ===== WHATSAPP ENDPOINT =====
app.post("/whatsapp", async (req, res) => {
  try {

    const { telefono } = req.body;

    console.log("Telefono recibido:", telefono);

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

    console.log("WhatsApp enviado");

    res.json(response.data);

  } catch (error) {

    console.log("ERROR:", error.response?.data || error.message);

    res.status(500).json(error.response?.data || error.message);
  }
});

// ===== SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});