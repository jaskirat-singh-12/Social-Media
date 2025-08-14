const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image in 2 lines." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
      You are an expert in generating captions for images.
      You generate single caption for the image provided.
      Your caption should be concise and relevant to the image in 5 lines.
      You should also consider the context of the image and any relevant details that could enhance the caption.
      Use hashtags and emojis to make the caption more engaging.
      `,
    },
  });
  return response.text;
} 

module.exports = generateCaption;
