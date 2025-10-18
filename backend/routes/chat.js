import { HfInference } from "@huggingface/inference";
import express from "express";
const router = express.Router();

// Hugging Face Inference
const hf = new HfInference(process.env.HF_TOKEN);

// Chatbot Endpoint
router.post("/", async (req, res) => {
  try {
    console.log("Chat endpoint request body:", req.body.message);
    const { prompt } = req.body.message;
    

    // Query the educational chatbot model
    const response = await hf.textGeneration({
      model: "bot-remains/student-assistance-chatbot",
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        repetition_penalty: 1.2,
      },
    });

    res.json({ response: response.generated_text.trim() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

export default router;
