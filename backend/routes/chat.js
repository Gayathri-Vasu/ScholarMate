const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

router.use(limiter);

// Helper: choose provider and call
async function callOpenAI(apiKey, messages) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 800,
      temperature: 0.7,
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenAI ${response.status} ${err.error?.message || response.statusText}`);
  }
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenAI returned empty response');
  return text;
}

async function callGemini(apiKey, messages) {
  const contents = messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 800 } }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Gemini ${response.status} ${err.error?.message || response.statusText}`);
  }
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned empty response');
  return text;
}

router.post('/', async (req, res) => {
  try {
    const { messages = [], provider = 'auto' } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: 'messages[] is required' });
    }

    const openaiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    const tryOpenAI = async () => {
      if (!openaiKey) throw new Error('OpenAI key missing');
      return await callOpenAI(openaiKey, messages);
    };
    const tryGemini = async () => {
      if (!geminiKey) throw new Error('Gemini key missing');
      return await callGemini(geminiKey, messages);
    };

    let text;
    if (provider === 'openai') {
      text = await tryOpenAI();
    } else if (provider === 'gemini') {
      text = await tryGemini();
    } else {
      // auto: OpenAI -> Gemini
      try {
        text = await tryOpenAI();
      } catch (e1) {
        try {
          text = await tryGemini();
        } catch (e2) {
          throw new Error(`${e1.message} | ${e2.message}`);
        }
      }
    }

    res.json({ success: true, text });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Chat proxy failed' });
  }
});

module.exports = router;

















