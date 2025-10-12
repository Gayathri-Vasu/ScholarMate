const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = import.meta.env.VITE_PERPLEXITY_API_URL || 'https://api.perplexity.ai/chat/completions';

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityResponse {
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

class PerplexityApiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = PERPLEXITY_API_KEY;
    this.apiUrl = PERPLEXITY_API_URL;

    if (!this.apiKey || this.apiKey === 'your_perplexity_api_key_here') {
      console.warn('Perplexity API key not configured. Please set VITE_PERPLEXITY_API_KEY in your .env file');
    }
  }

  async sendMessage(
    userMessage: string,
    conversationHistory: PerplexityMessage[] = []
  ): Promise<string> {
    if (!this.apiKey || this.apiKey === 'your_perplexity_api_key_here') {
      throw new Error('Perplexity API key not configured');
    }

    const systemMessage: PerplexityMessage = {
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

    const messages: PerplexityMessage[] = [
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
          model: 'llama-3.1-sonar-small-128k',
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Perplexity API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data: PerplexityResponse = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error('No response from Perplexity API');
      }
    } catch (error) {
      console.error('Perplexity API request failed:', error);
      throw error;
    }
  }

  // Helper method to format conversation history for the API
  formatConversationHistory(messages: Array<{sender: 'user' | 'bot', text: string}>): PerplexityMessage[] {
    return messages
      .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
  }
}

export const perplexityApiService = new PerplexityApiService();
export default perplexityApiService;
