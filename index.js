const express = require("express");

const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
 
dotenv.config();
 
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // folder public untuk HTML, CSS, JS
 
// Konfigurasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
 
const chat = model.startChat({
  history: [],
  generationConfig: {
    temperature: 0.9,
    topP: 1,
    topK: 1,
  },
  systemInstruction: {
    role: "user",
    parts: [
      {
        text: `
Kamu adalah Karo AI, asisten AI yang ramah, santai 😄
- Gunakan emoji dengan natural
- Gaya ngobrolnya hangat, kayak temen deket
- Tetap jelas & fun
        `.trim(),
      },
    ],
  },
});
 
// API Chat
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: "Pesan tidak boleh kosong" });
 
  try {
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const reply = response.text();
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});
 
// Serve halaman utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
 
// index.js
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
