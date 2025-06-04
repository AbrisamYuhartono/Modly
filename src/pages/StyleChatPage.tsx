import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageCircle, Image, ThumbsUp, ChevronDown } from 'lucide-react';
import { sampleStyleChat } from '../data/sampleData';
import { Message } from '../types';

const StyleChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(sampleStyleChat as Message[]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      generateAIResponse(inputMessage);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    let responseText = '';
    
    // Hardcoded responses based on keywords
    if (userInput.toLowerCase().includes('color') || userInput.toLowerCase().includes('colours')) {
      responseText = "Colors play a significant role in how an outfit looks on you! Based on your skin tone profile, I recommend focusing on jewel tones like emerald green, sapphire blue, and deep purple. These will complement your complexion beautifully. For neutrals, warm browns and soft whites work better than stark black or gray.";
    } else if (userInput.toLowerCase().includes('body') || userInput.toLowerCase().includes('shape')) {
      responseText = "For your body shape, I recommend outfits that define your waist and create balanced proportions. Try high-waisted bottoms paired with tucked-in tops, and A-line dresses that cinch at the waist. Avoid oversized boxy silhouettes that hide your natural curves.";
    } else if (userInput.toLowerCase().includes('occasion') || userInput.toLowerCase().includes('event') || userInput.toLowerCase().includes('party')) {
      responseText = "For special occasions, consider a midi dress in a jewel tone with simple accessories. If it's more formal, a fitted jumpsuit in navy or burgundy would look sophisticated. For casual events, try dark-wash jeans with a silky top and statement earrings.";
    } else if (userInput.toLowerCase().includes('hijab') || userInput.toLowerCase().includes('modest')) {
      responseText = "For modest fashion with hijab, I recommend layering with long cardigans, maxi skirts, and loose-fitting trousers in complementary colors. Monochromatic looks with varying textures create elegant, cohesive outfits. Would you like some specific outfit ideas?";
    } else if (userInput.toLowerCase().includes('recommend') || userInput.toLowerCase().includes('suggestion')) {
      responseText = "Based on your style profile, I recommend these pieces to add to your wardrobe:\n\n1. A structured blazer in emerald green\n2. High-waisted wide-leg trousers in a neutral tone\n3. A silky button-down in a jewel tone\n4. A versatile midi skirt that can be dressed up or down\n5. A quality white t-shirt for layering\n\nThese items would mix and match well with your existing pieces!";
    } else {
      responseText = "Thank you for your question! Based on your style profile, I'd recommend pieces that highlight your unique features while expressing your personal style. Would you like me to suggest specific outfits for work, casual wear, or special occasions?";
    }
    
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'assistant',
      text: responseText,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "What colors suit my skin tone best?",
    "What styles work for my body shape?",
    "Can you recommend outfits for a special occasion?",
    "How can I style hijab with modern outfits?",
    "What key pieces should I add to my wardrobe?"
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        {/* Header */}
        <div className="px-6 py-4 bg-purple-600 text-white">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-full mr-3">
              <MessageCircle size={24} />
            </div>
            <div>
              <h2 className="font-medium">Style AI Assistant</h2>
              <p className="text-sm opacity-80">Ask anything about fashion and your style</p>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-purple-100 dark:bg-purple-900/40 text-gray-800 dark:text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'} rounded-lg px-4 py-3 shadow-sm`}>
                <div className="flex items-center mb-1">
                  {message.sender === 'assistant' && (
                    <div className="bg-purple-600 text-white p-1 rounded-full mr-2">
                      <MessageCircle size={14} />
                    </div>
                  )}
                  {message.sender === 'user' && (
                    <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full mr-2">
                      <User size={14} />
                    </div>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.sender === 'user' ? 'You' : 'Style AI'} • {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="whitespace-pre-line">{message.text}</p>
                {message.sender === 'assistant' && (
                  <div className="mt-2 flex justify-end space-x-2">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                      <ThumbsUp size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm max-w-[80%]">
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white p-1 rounded-full mr-2">
                    <MessageCircle size={14} />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Style AI is typing...</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
        
        {/* Suggested Questions */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Suggested questions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        {/* Input */}
        <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mr-2"
            >
              <Image size={20} />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your style, outfit ideas, or fashion advice..."
              className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`p-2 ml-2 rounded-full ${
                !inputMessage.trim() || isLoading
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors duration-200`}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StyleChatPage;