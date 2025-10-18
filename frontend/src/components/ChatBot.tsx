import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      text: "Hello! 👋 I'm your Scholar Mate assistant. You can ask me about study topics like LCM, HCF, blood, the human heart, or even about this website!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Detailed keyword-based chatbot logic
  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    if (q.includes('blood')) {
      return (
        "🩸 **Blood Composition and Formula:**\n" +
        "Blood is a vital connective tissue that circulates through our body, transporting oxygen, nutrients, and hormones. It is composed of:\n\n" +
        "1️⃣ **Plasma (55%)** – The liquid part, made mostly of water, proteins, and dissolved substances.\n" +
        "2️⃣ **Red Blood Cells (RBCs)** – Carry oxygen using the pigment **Hemoglobin (C₇₄₀H₁₂₀₆N₁₉₈O₂₀₈Fe₃)**.\n" +
        "3️⃣ **White Blood Cells (WBCs)** – Defend against infections.\n" +
        "4️⃣ **Platelets** – Help in clotting blood.\n\n" +
        "🧠 Fun fact: An average adult has about **5 liters** of blood in their body!"
      );
    }

    if (q.includes('lcm') || q.includes('hcf')) {
      return (
        "📘 **LCM and HCF Formulas Explained:**\n\n" +
        "**HCF (Highest Common Factor)** is the greatest number that divides two or more numbers exactly.\n" +
        "**LCM (Least Common Multiple)** is the smallest number that is a multiple of the given numbers.\n\n" +
        "🔹 **Relationship between LCM and HCF:**\n" +
        "👉 LCM × HCF = Product of the two numbers.\n\n" +
        "**Example:**\n" +
        "Let the numbers be 12 and 18.\n" +
        "→ HCF = 6\n" +
        "→ LCM = (12 × 18) / 6 = 36\n\n" +
        "✅ Therefore, LCM × HCF = 12 × 18 = 216 (which is equal to Product of the numbers)."
      );
    }

    if (q.includes('heart')) {
      return (
        "💖 **Human Heart Overview:**\n\n" +
        "The human heart is a muscular organ about the size of your fist. It pumps blood throughout the body, supplying oxygen and nutrients while removing waste products like carbon dioxide.\n\n" +
        "🩺 **Structure:**\n" +
        "• The heart has **four chambers** – Right Atrium, Right Ventricle, Left Atrium, and Left Ventricle.\n" +
        "• It has **valves** that prevent blood from flowing backward.\n" +
        "• The right side pumps **deoxygenated blood** to the lungs.\n" +
        "• The left side pumps **oxygenated blood** to the body.\n\n" +
        "💡 **Heartbeat rate:** Around **72 beats per minute** for a healthy adult.\n" +
        "❤️ The heart never rests – it beats about **100,000 times per day!**"
      );
    }

    if (q.includes('about') && (q.includes('website') || q.includes('scholar'))) {
      return (
        "🌐 **About Scholar Mate:**\n\n" +
        "Scholar Mate is an AI-powered e-learning platform built to make education interactive and personalized. It provides study materials, tests, and an intelligent chatbot to answer your academic questions.\n\n" +
        "✨ **Key Features:**\n" +
        "• Interactive learning modules\n" +
        "• AI-based study assistance\n" +
        "• Practice tests and quizzes\n" +
        "• Smart chatbot for academic help\n\n" +
        "🎯 **Goal:** To help students learn concepts clearly and effectively anytime, anywhere. Scholar Mate acts like your friendly digital study partner!"
      );
    }

    return (
      "🤔 I'm not sure about that one yet! Try asking me about topics like 'blood', 'LCM and HCF', 'heart', or 'about this website'. I'm still learning new things every day! 😊"
    );
  };

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

    // Simulate "typing" delay for realism
    setTimeout(() => {
      const botReply = getBotResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1200);
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
              <span className="font-semibold">Scholar Mate Assistant</span>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-glow/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  {message.sender === 'bot' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted',
                    )}
                  >
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
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1"
              />
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
