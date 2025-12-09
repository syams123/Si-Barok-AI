import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi Gemini dengan API Key dari Environment Variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Pilih model Gemini (flash cepat atau pro lebih pintar)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Kirim prompt ke Gemini
    const result = await model.generateContent(message);
    const reply = result.response.text();

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
} catch (err) {
  console.error("Gemini API error:", err);

  return new Response(
    JSON.stringify({ reply: `⚡ Error detail: ${err.message}` }),
    {
      headers: { "Content-Type": "application/json" },
      status: 500,
    }
  );
}

