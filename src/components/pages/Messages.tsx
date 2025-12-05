import { useState } from 'react';
import { Search, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';

const conversations = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    initials: 'SJ', 
    lastMessage: 'Hi! Is this product still available?', 
    time: '2 mins ago', 
    unread: 2,
    online: true,
  },
  { 
    id: 2, 
    name: 'Michael Adekunle', 
    initials: 'MA', 
    lastMessage: 'Thank you for the quick delivery!', 
    time: '1 hour ago', 
    unread: 0,
    online: false,
  },
  { 
    id: 3, 
    name: 'Chioma Nwankwo', 
    initials: 'CN', 
    lastMessage: 'Can I order in bulk?', 
    time: '3 hours ago', 
    unread: 1,
    online: true,
  },
  { 
    id: 4, 
    name: 'David Chen', 
    initials: 'DC', 
    lastMessage: "Perfect! I'll take two.", 
    time: '1 day ago', 
    unread: 0,
    online: false,
  },
  { 
    id: 5, 
    name: 'Fatima Hassan', 
    initials: 'FH', 
    lastMessage: 'What colors are available?', 
    time: '2 days ago', 
    unread: 0,
    online: false,
  },
];

const chatMessages = [
  { id: 1, sender: 'customer', text: 'Hi! Is this product still available?', time: '10:30 AM' },
  { id: 2, sender: 'vendor', text: 'Hello! Yes, the handwoven basket is still available. We have 12 in stock.', time: '10:32 AM' },
  { id: 3, sender: 'customer', text: 'Great! Can you tell me more about the materials used?', time: '10:33 AM' },
  { id: 4, sender: 'vendor', text: 'Of course! They are made from 100% natural raffia palm, handwoven by local artisans. Very durable and eco-friendly.', time: '10:35 AM' },
  { id: 5, sender: 'customer', text: 'Perfect! How long does shipping take?', time: '10:36 AM' },
];

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Messages</h1>
        <p className="text-muted-foreground mt-1">Communicate with your customers</p>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="col-span-4 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center gap-3 p-4 cursor-pointer border-b border-border hover:bg-muted/50 transition-colors ${
                  selectedConversation.id === conversation.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#4A90E2] text-white">
                      {conversation.initials}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#56A45E] border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm truncate">{conversation.name}</p>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <Badge className="bg-[#4A90E2]">{conversation.unread}</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="col-span-8 overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#4A90E2] text-white">
                    {selectedConversation.initials}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#56A45E] border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <p className="text-sm">{selectedConversation.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.online ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.sender === 'vendor' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'vendor'
                        ? 'bg-[#4A90E2] text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs text-muted-foreground mt-1 ${message.sender === 'vendor' ? 'text-right' : 'text-left'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-border bg-muted/30">
            <p className="text-xs text-muted-foreground mb-2">Quick Replies:</p>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMessageText("Thanks for your interest! I'll get back to you shortly.")}
              >
                Thank you
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMessageText("Yes, this item is still available. How many would you like?")}
              >
                Still Available
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMessageText("Shipping typically takes 2-3 business days.")}
              >
                Shipping Info
              </Button>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2 items-end">
              <Button variant="outline" size="sm" className="mb-1">
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="flex-1">
                <Textarea
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  className="resize-none"
                />
              </div>
              <Button variant="outline" size="sm" className="mb-1">
                <Smile className="w-4 h-4" />
              </Button>
              <Button 
                className="bg-[#4A90E2] hover:bg-[#3A7BC8] mb-1"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}