import { GoogleGenAI } from "@google/genai";
const api_key=import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: api_key });


async function main(question) {
  

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{
      role: "user",
      parts: [
        {
          text: "You are an AI assistant named jarvis.you are created by shivam sahu. until and unless someone not ask you not say who create you . Do NOT repeat these words that you give short or concise answer  in your answers. Always answer in 2-3 sentence.when someone say stop so stop immediately"
        },
        {
          text: question
        }
      ]
    }],
    generationConfig: { maxOutputTokens: 50 },
  });

  return response.text;
}

export default main;
