import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { localChatbotService } from '@/services/localChatbot';
import { geminiApiService } from '@/services/geminiApi';
import { chatgptApiService } from '@/services/chatgptApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Scholar mate assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<'openai' | 'gemini' | 'local'>('local');

  useEffect(() => {
    if (chatgptApiService.isConfigured()) setProvider('openai');
    else if (geminiApiService.isConfigured()) setProvider('gemini');
    else setProvider('local');
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      let responseText: string | undefined;

      if (provider === 'openai') {
        try {
          const history = chatgptApiService.formatConversationHistory(messages);
          responseText = await chatgptApiService.sendMessageViaBackend(currentInput, history);
        } catch {}
        if (!responseText) {
          try {
            const history = chatgptApiService.formatConversationHistory(messages);
            responseText = await chatgptApiService.sendMessage(currentInput, history);
          } catch {}
        }
      }

      if (!responseText && (provider === 'gemini' || provider === 'openai')) {
        try {
          const history = geminiApiService.formatConversationHistory(messages);
          responseText = await geminiApiService.sendMessage(currentInput, history);
        } catch {}
      }

      if (!responseText) {
        responseText = await localChatbotService.sendMessage(currentInput);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I couldn't process that. Please try asking in a different way.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow hover:shadow-elegant z-50',
          isOpen && 'hidden',
        )}
        variant="hero"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col shadow-elegant z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-primary rounded-t-lg">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Scholar mate Assistant</span>
            </div>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-glow/20">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn('flex gap-2', message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  {message.sender === 'bot' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={cn('max-w-[75%] rounded-lg px-3 py-2 text-sm', message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" />
                      <span className="h-2 w-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                      <span className="h-2 w-2 bg-primary/60 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ask anything..." disabled={isLoading} className="flex-1" />
              <Button type="submit" size="icon" disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}