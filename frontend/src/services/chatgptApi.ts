const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface ChatGPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class ChatGPTApiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = OPENAI_API_KEY as string;
    this.apiUrl = OPENAI_API_URL;

    if (!this.apiKey || this.apiKey === 'your_openai_api_key_here') {
      console.warn('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file');
    }
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && typeof this.apiKey === 'string' && this.apiKey.trim().length > 0 && this.apiKey !== 'your_openai_api_key_here');
  }

  async sendMessage(
    userMessage: string,
    conversationHistory: ChatGPTMessage[] = []
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const systemMessage: ChatGPTMessage = {
      role: 'system',
      content: `You are Scholar mate Assistant, a helpful AI assistant for the Scholar mate educational platform. You can answer any question on any topic, just like ChatGPT. 

While you specialize in educational content for Tamil Nadu students, you are also capable of:
- Answering general knowledge questions
- Helping with homework and assignments
- Explaining concepts from any subject
- Providing creative writing assistance
- Solving math problems
- Discussing current events
- Offering life advice and tips
- Helping with coding and programming
- And much more!

For Scholar mate platform specifically, you can help with:
- TN State Board (Classes 9-12): Mathematics, Physics, Chemistry, Biology, Tamil, English, Social Science, Computer Science
- TNPSC Preparation: Group I, Group II, Group IV, VAO, TET exams
- Engineering: CSE, IT, Electrical, Mechanical, Civil, Electronics
- IT Placement: Aptitude, Programming, System Design, GenAI & Prompting, Soft Skills

Be friendly, informative, helpful, and engaging in all your responses. Always provide accurate and helpful information.`
    };

    const messages: ChatGPTMessage[] = [
      systemMessage,
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data: ChatGPTResponse = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error('No response from OpenAI API');
      }
    } catch (error) {
      console.error('OpenAI API request failed:', error);
      throw error;
    }
  }

  async sendMessageViaBackend(userMessage: string, conversationHistory: ChatGPTMessage[] = []): Promise<string> {
    const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const messages: ChatGPTMessage[] = [
      { role: 'system', content: 'You are Scholar mate Assistant. Be helpful, accurate, and concise.' },
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    const resp = await fetch(`${backendUrl}/api/${API_VERSION}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, provider: 'openai' }),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.message || resp.statusText);
    }
    const data = await resp.json();
    if (!data.success) throw new Error(data.message || 'Chat failed');
    return data.text;
  }

  // Helper method to format conversation history for the API
  formatConversationHistory(messages: Array<{sender: 'user' | 'bot', text: string}>): ChatGPTMessage[] {
    return messages
      .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
  }
}

export const chatgptApiService = new ChatGPTApiService();
export default chatgptApiService;
