import { useState } from 'react';
import { Search, HelpCircle, MessageCircle, FileText, Send, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I add my first product?',
        a: 'Navigate to the "My Products" page and click the "Add New Product" button. Fill in the product details including name, price, description, and upload images. Make sure to set it as "Active" to make it visible to customers.',
      },
      {
        q: 'How do I set up my bank account for withdrawals?',
        a: 'Go to Settings > Banking tab. Enter your bank details including bank name, account number, and account name. Once verified, you can use this account to withdraw your earnings.',
      },
      {
        q: 'How long does it take to receive payments?',
        a: 'Payments are typically processed within 24-48 hours after order completion. The funds will be available in your wallet, and you can withdraw them to your bank account at any time.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How do I process an order?',
        a: 'When you receive an order, go to the Orders page. Click on the order to view details, then mark it as "Processing" to let the customer know you\'re preparing it. Once shipped, update the status to "Completed".',
      },
      {
        q: 'What should I do if a customer wants to cancel?',
        a: 'If the order hasn\'t been shipped yet, you can cancel it from the order details page. The customer will receive an automatic refund. If it\'s already shipped, coordinate with the customer directly.',
      },
      {
        q: 'How do I handle returns?',
        a: 'Contact the customer through the Messages feature to discuss the return. You can issue a refund from your Wallet page once you\'ve agreed on the return terms.',
      },
    ],
  },
  {
    category: 'Payments & Fees',
    questions: [
      {
        q: 'What are the platform fees?',
        a: 'Vendoura charges a 5% commission on each sale. This fee is automatically deducted before the payment reaches your wallet. There are no listing fees or monthly charges.',
      },
      {
        q: 'When can I withdraw my earnings?',
        a: 'You can withdraw your earnings anytime your balance is ₦5,000 or more. Withdrawals are processed within 1-2 business days to your registered bank account.',
      },
      {
        q: 'Are there any withdrawal fees?',
        a: 'No, there are no fees for withdrawing your earnings to your Nigerian bank account.',
      },
    ],
  },
  {
    category: 'Account & Settings',
    questions: [
      {
        q: 'How do I change my store name?',
        a: 'Go to Settings > Store Information. Update your store name and click "Save Store Settings". Changes will be reflected immediately.',
      },
      {
        q: 'Can I have multiple stores?',
        a: 'Currently, each vendor account is limited to one store. If you need multiple stores, you\'ll need to create separate vendor accounts.',
      },
      {
        q: 'How do I enable notifications?',
        a: 'Go to Settings > Notifications to manage your notification preferences. You can choose to receive alerts via email or push notifications for orders, messages, and updates.',
      },
    ],
  },
];

const popularArticles = [
  { title: 'Getting Started with Vendoura', views: 1247, icon: <HelpCircle className="w-5 h-5" /> },
  { title: 'How to Optimize Your Product Listings', views: 892, icon: <FileText className="w-5 h-5" /> },
  { title: 'Best Practices for Product Photography', views: 756, icon: <FileText className="w-5 h-5" /> },
  { title: 'Understanding Payment Processing', views: 643, icon: <FileText className="w-5 h-5" /> },
];

export function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmitTicket = () => {
    if (ticketSubject && ticketMessage) {
      // Submit ticket logic
      setTicketSubject('');
      setTicketMessage('');
      alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1>Help & Support</h1>
        <p className="text-muted-foreground mt-1">We're here to help you succeed</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help articles, FAQs, or topics..." 
                className="pl-12 h-12 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#4A90E2] rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm mb-1">Live Chat</h3>
              <p className="text-xs text-muted-foreground mb-3">Chat with our support team</p>
              <Badge className="bg-[#56A45E]">Online</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#F2994A] rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm mb-1">Email Support</h3>
              <p className="text-xs text-muted-foreground mb-3">support@vendoura.com</p>
              <p className="text-xs text-muted-foreground">Response within 24hrs</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#56A45E] rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm mb-1">Phone Support</h3>
              <p className="text-xs text-muted-foreground mb-3">+234 800 VENDOURA</p>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Mon-Fri, 9AM-6PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="articles">Help Articles</TabsTrigger>
          <TabsTrigger value="ticket">Submit a Ticket</TabsTrigger>
        </TabsList>

        {/* FAQs */}
        <TabsContent value="faq" className="mt-6">
          <div className="space-y-6">
            {faqCategories.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.questions.map((item, qIndex) => (
                      <AccordionItem key={qIndex} value={`item-${catIndex}-${qIndex}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground">{item.a}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Help Articles */}
        <TabsContent value="articles" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
              <CardDescription>Most helpful resources for vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#4A90E2] rounded-lg flex items-center justify-center text-white">
                        {article.icon}
                      </div>
                      <div>
                        <p className="text-sm">{article.title}</p>
                        <p className="text-xs text-muted-foreground">{article.views} views</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Read</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {faqCategories.map((category, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <h4 className="text-sm mb-1">{category.category}</h4>
                    <p className="text-xs text-muted-foreground">{category.questions.length} articles</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submit Ticket */}
        <TabsContent value="ticket" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Can't find what you're looking for? Send us a message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticketCategory">Category</Label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                  <option>Select a category</option>
                  <option>Account Issues</option>
                  <option>Payment Problems</option>
                  <option>Order Management</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Brief description of your issue"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={6}
                  placeholder="Please provide as much detail as possible..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachment">Attachments (optional)</Label>
                <Input id="attachment" type="file" multiple />
                <p className="text-xs text-muted-foreground">You can attach screenshots or documents to help us understand your issue</p>
              </div>
              <div className="p-4 bg-[#EBF4FC] rounded-lg">
                <h4 className="text-sm mb-2">What happens next?</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• We'll review your ticket within 2-4 hours</li>
                  <li>• You'll receive an email confirmation with your ticket number</li>
                  <li>• Our support team will respond within 24 hours</li>
                  <li>• You can track your ticket status in your email</li>
                </ul>
              </div>
              <Button 
                className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]"
                onClick={handleSubmitTicket}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}