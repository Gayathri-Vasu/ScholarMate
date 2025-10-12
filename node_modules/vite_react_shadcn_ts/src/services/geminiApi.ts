// Gemini API service for chat responses
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeminiMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role?: 'user' | 'model';
  parts: GeminiPart[];
}

interface GeminiResponseCandidate {
  content: GeminiContent;
}

interface GeminiResponse {
  candidates?: GeminiResponseCandidate[];
  promptFeedback?: unknown;
}

class GeminiApiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = GEMINI_API_KEY as string;
    this.apiUrl = GEMINI_API_URL;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && typeof this.apiKey === 'string' && this.apiKey.trim().length > 0);
  }

  formatConversationHistory(messages: Array<{ sender: 'user' | 'bot'; text: string }>): GeminiContent[] {
    return messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));
  }

  async sendMessage(userMessage: string, conversationHistory: GeminiContent[] = []): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    const systemInstruction: GeminiContent = {
      role: 'user',
      parts: [
        {
          text:
            'You are Scholar mate Assistant, a helpful AI for an education platform. Answer any question like ChatGPT. Be concise, friendly, and accurate. When asked education-specific questions, tailor to Tamil Nadu students. If the user asks formulas or definitions, provide them clearly. If you are unsure, say so briefly and suggest next steps.',
        },
      ],
    };

    const contents: GeminiContent[] = [systemInstruction, ...conversationHistory, { role: 'user', parts: [{ text: userMessage }] }];

    const url = `${this.apiUrl}?key=${encodeURIComponent(this.apiKey)}`;

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!resp.ok) {
      let detail = resp.statusText;
      try {
        const data = (await resp.json()) as any;
        detail = data.error?.message || detail;
      } catch {}
      throw new Error(`Gemini API error: ${resp.status} - ${detail}`);
    }

    const data = (await resp.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('No response from Gemini API');
    }
    return text;
  }
}

export const geminiApiService = new GeminiApiService();
export default geminiApiService;

















