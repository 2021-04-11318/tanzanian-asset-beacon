
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Send, Bot, User, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FinanceChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your financial advisor AI. I can help you understand investing, the Tanzanian stock market, portfolio management, and answer any finance-related questions. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('finance-chat', {
        body: { message: inputMessage }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        title: "Chat Error",
        description: "Failed to get response from AI assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Split by double newlines for paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle bullet points
      if (paragraph.includes('•') || paragraph.includes('-')) {
        const lines = paragraph.split('\n');
        return (
          <div key={index} className="mb-3">
            {lines.map((line, lineIndex) => {
              if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                return (
                  <div key={lineIndex} className="flex items-start mb-1">
                    <span className="text-purple-600 mr-2 text-sm">•</span>
                    <span className="text-sm leading-relaxed">{line.replace(/^[•-]\s*/, '')}</span>
                  </div>
                );
              }
              return <p key={lineIndex} className="text-sm leading-relaxed mb-2">{line}</p>;
            })}
          </div>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\./.test(paragraph.trim())) {
        const lines = paragraph.split('\n');
        return (
          <div key={index} className="mb-3">
            {lines.map((line, lineIndex) => {
              const match = line.match(/^(\d+)\.\s*(.+)/);
              if (match) {
                return (
                  <div key={lineIndex} className="flex items-start mb-2">
                    <span className="text-purple-600 font-semibold mr-2 text-sm">{match[1]}.</span>
                    <span className="text-sm leading-relaxed">{match[2]}</span>
                  </div>
                );
              }
              return <p key={lineIndex} className="text-sm leading-relaxed mb-1">{line}</p>;
            })}
          </div>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-sm leading-relaxed mb-3">
          {paragraph}
        </p>
      );
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="elegant-button-primary rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    );
  }

  const chatWindowClass = isMaximized 
    ? "fixed inset-4 z-50 elegant-card border-2 border-purple-100 flex flex-col" 
    : "fixed bottom-6 right-6 z-50 w-96 h-[500px] elegant-card border-2 border-purple-100 flex flex-col";

  return (
    <div className={chatWindowClass}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Finance AI Assistant</h3>
            <p className="text-xs text-gray-500">Investment guidance & market insights</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            onClick={() => setIsMaximized(!isMaximized)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="p-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex-shrink-0 mt-1">
                <Bot size={16} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                  : 'bg-gray-50 text-gray-900 border border-gray-200'
              }`}
            >
              {message.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none">
                  {formatMessage(message.content)}
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{message.content}</p>
              )}
            </div>
            {message.role === 'user' && (
              <div className="p-1 bg-gray-300 rounded-full flex-shrink-0 mt-1">
                <User size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-2">
            <div className="p-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-purple-600" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about investing, stocks, or market trends..."
            className="flex-1 elegant-input text-sm"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="elegant-button-primary p-2"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinanceChatbot;
