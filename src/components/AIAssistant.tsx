import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, TrendingUp, Package, MessageSquare, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import { PageType } from '../VendorDashboard';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
  actionButton?: {
    label: string;
    action: string;
  };
}

interface AIAssistantProps {
  onNavigate?: (page: PageType) => void;
  onOpenRecommendations?: () => void;
}

const quickReplies = [
  { icon: TrendingUp, text: 'Give me growth tips', color: '#4A90E2' },
  { icon: Package, text: 'Help me set up my store', color: '#56A45E' },
  { icon: BarChart3, text: 'Show me analytics summary', color: '#F2994A' },
  { icon: MessageSquare, text: 'What should I fix today?', color: '#F5C33C' },
];

const aiResponses: { [key: string]: Message } = {
  'Give me growth tips': {
    id: 0,
    text: "Based on your store performance, here are 3 quick wins:\n\n1. **Update Product Titles** - Add keywords like 'handmade' and 'Nigerian' to improve search visibility\n2. **Improve Photo Quality** - 3 of your products would benefit from cleaner backgrounds\n3. **Respond Faster** - You have 2 pending messages. Quick replies increase sales by 40%!",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'View Full Recommendations',
      action: 'recommendations'
    }
  },
  'Help me set up my store': {
    id: 0,
    text: "I'll help you set up your store! Here's what you need:\n\n✓ Add at least 5 products with quality photos\n✓ Write detailed product descriptions\n✓ Set competitive prices in ₦\n✓ Add product categories\n✓ Complete your vendor profile\n\nWould you like me to guide you through adding your first product?",
    sender: 'ai',
    timestamp: new Date(),
    suggestions: ['Add a product', 'Set up my profile', 'Learn about pricing']
  },
  'Show me analytics summary': {
    id: 0,
    text: "📊 **Your Store Summary (Last 7 Days)**\n\n💰 Total Sales: ₦125,000\n📦 Orders: 12 (3 pending)\n👁️ Product Views: 247\n📈 Top Product: Handwoven Basket\n\n**Insight:** Your sales are up 15% from last week! Your afternoon posts get the most engagement.",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'View Full Analytics',
      action: 'analytics'
    }
  },
  'What should I fix today?': {
    id: 0,
    text: "🎯 **Priority Actions for Today:**\n\n1. **Respond to 2 pending messages** - Customers waiting for replies\n2. **Update 3 product photos** - Images need better lighting\n3. **Restock Alert** - 'Woven Table Mat' is low on stock\n4. **Workshop Today** - 'Social Media Marketing' starts in 3 hours\n\nShould I help you with any of these?",
    sender: 'ai',
    timestamp: new Date(),
    suggestions: ['View messages', 'Update photos', 'Check stock', 'View workshops']
  },
  'Add a product': {
    id: 0,
    text: "To add a new product:\n\n1. Go to **My Products** page\n2. Click the green **'Add New Product'** button\n3. Upload quality photos (at least 3 images)\n4. Write a descriptive title with keywords\n5. Set your price in ₦\n6. Add detailed description\n7. Choose category and stock quantity\n\nWould you like me to take you to the Products page now?",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'Go to My Products',
      action: 'products'
    }
  },
  'Set up my profile': {
    id: 0,
    text: "Let's complete your vendor profile:\n\n1. Add a profile photo\n2. Write your store description\n3. Add business information\n4. Set up payment details\n5. Complete verification\n\nA complete profile increases customer trust by 60%!",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'Go to Settings',
      action: 'settings'
    }
  },
  'Learn about pricing': {
    id: 0,
    text: "💰 **Pricing Tips for Nigerian Market:**\n\n• Research competitor prices\n• Factor in materials + time + overhead\n• Add 30-40% profit margin\n• Consider bulk discounts\n• Update prices quarterly\n\n**Example:** If materials cost ₦2,000 and takes 2 hours → Price at ₦4,500-₦5,500\n\nWant to see the Learning Hub for more pricing strategies?",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'View Learning Hub',
      action: 'learning'
    }
  },
  'View messages': {
    id: 0,
    text: "You have 2 unread messages from customers. Quick responses lead to more sales! Let me take you to your Messages page.",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'Go to Messages',
      action: 'messages'
    }
  },
  'Update photos': {
    id: 0,
    text: "Photo tips for better sales:\n\n📸 Use natural lighting\n📸 Clean, uncluttered backgrounds\n📸 Show product from multiple angles\n📸 Include size reference\n📸 Edit for brightness and clarity\n\nProducts with quality photos sell 3x faster!",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'View My Products',
      action: 'products'
    }
  },
  'Check stock': {
    id: 0,
    text: "📦 **Stock Status:**\n\nLow Stock Items:\n• Woven Table Mat - Only 2 left\n• Traditional Ankara Bag - 3 remaining\n\nOut of Stock:\n• None\n\nKeep your popular items in stock to avoid losing sales!",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'Manage Products',
      action: 'products'
    }
  },
  'View workshops': {
    id: 0,
    text: "🎓 **Today's Workshop:**\n\n'Social Media Marketing for Vendors'\n⏰ Starts in 3 hours\n👥 12 vendors registered\n\nUpcoming:\n• Product Photography (Tomorrow)\n• Pricing Strategies (Friday)\n\nWorkshops help you grow your business!",
    sender: 'ai',
    timestamp: new Date(),
    actionButton: {
      label: 'View All Workshops',
      action: 'events'
    }
  },
  'default': {
    id: 0,
    text: "I'm Vendoura AI, your growth partner! 🌟\n\nI can help you with:\n\n• Growth tips and sales strategies\n• Product and store setup\n• Analytics and insights\n• Dashboard navigation\n• Customer management\n• Marketing advice\n\nHow can I help you today?",
    sender: 'ai',
    timestamp: new Date(),
    suggestions: ['Give me growth tips', 'Show me analytics summary', 'What should I fix today?']
  }
};

export function AIAssistant({ onNavigate, onOpenRecommendations }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Vendoura AI, your growth partner 🌟\n\nI'm here to help you grow your business. Try asking me for growth tips or analytics!",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI thinking
    setIsTyping(true);

    // Find matching response or use default
    setTimeout(() => {
      const response = aiResponses[text] || aiResponses['default'];
      const aiMessage: Message = {
        ...response,
        id: messages.length + 2,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  const handleAction = (action: string) => {
    if (action === 'recommendations' && onOpenRecommendations) {
      onOpenRecommendations();
    } else if (onNavigate) {
      const pageMap: { [key: string]: PageType } = {
        'products': 'products',
        'analytics': 'analytics',
        'messages': 'messages',
        'settings': 'settings',
        'learning': 'learning-hub',
        'events': 'event-workshop',
      };
      if (pageMap[action]) {
        onNavigate(pageMap[action]);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          style={{ 
            backgroundColor: '#4A90E2',
            boxShadow: isOpen ? '0 0 20px rgba(74, 144, 226, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Sparkles className="h-6 w-6 text-white" />
          )}
        </Button>
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            Chat with Vendoura AI
          </div>
        )}
      </div>

      {/* AI Chat Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] animate-in slide-in-from-bottom-4 duration-300"
          style={{ maxHeight: 'calc(100vh - 140px)' }}
        >
          <Card className="h-full flex flex-col shadow-2xl border-2" style={{ borderColor: '#4A90E2' }}>
            {/* Header */}
            <CardHeader className="pb-3 border-b" style={{ backgroundColor: '#4A90E2' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Vendoura AI</CardTitle>
                    <p className="text-white/80 text-xs">Your Growth Partner</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap',
                      message.sender === 'user'
                        ? 'bg-[#4A90E2] text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    )}
                  >
                    {message.text}
                    
                    {/* Action Button */}
                    {message.actionButton && (
                      <Button
                        onClick={() => handleAction(message.actionButton!.action)}
                        className="mt-3 w-full"
                        size="sm"
                        style={{ backgroundColor: '#56A45E' }}
                      >
                        {message.actionButton.label}
                      </Button>
                    )}

                    {/* Smart Reply Suggestions */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            onClick={() => handleQuickReply(suggestion)}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Quick Replies */}
            <div className="border-t bg-white p-3">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickReplies.map((reply, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleQuickReply(reply.text)}
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 text-xs h-auto py-2"
                    style={{ borderColor: reply.color + '40' }}
                  >
                    <reply.icon className="h-3 w-3" style={{ color: reply.color }} />
                    <span className="truncate">{reply.text}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-3">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  size="icon"
                  style={{ backgroundColor: '#4A90E2' }}
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
