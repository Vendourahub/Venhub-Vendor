import { useState } from 'react';
import { Plus, MessageSquare, ThumbsUp, Image as ImageIcon, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const discussions = [
  {
    id: 1,
    author: 'Sarah Johnson',
    initials: 'SJ',
    title: 'Best practices for product packaging?',
    content: "I'm looking for advice on eco-friendly packaging options that are also cost-effective. What do you all use?",
    category: 'Tips',
    replies: 12,
    likes: 24,
    time: '2 hours ago',
    hasImage: false,
  },
  {
    id: 2,
    author: 'Michael Adekunle',
    initials: 'MA',
    title: 'How to handle difficult customers',
    content: "I recently had a challenging situation with a customer. How do you all maintain professionalism while standing firm on your policies?",
    category: 'Question',
    replies: 8,
    likes: 15,
    time: '4 hours ago',
    hasImage: false,
  },
  {
    id: 3,
    author: 'Chioma Nwankwo',
    initials: 'CN',
    title: 'My new product line launch!',
    content: 'Excited to share my new collection of handwoven baskets! Here are some photos from the photoshoot.',
    category: 'Showcase',
    replies: 18,
    likes: 45,
    time: '1 day ago',
    hasImage: true,
  },
  {
    id: 4,
    author: 'David Chen',
    initials: 'DC',
    title: 'Pricing strategy for handmade items',
    content: 'How do you price your handmade products? I struggle with balancing fair compensation for my time versus competitive pricing.',
    category: 'Question',
    replies: 20,
    likes: 32,
    time: '1 day ago',
    hasImage: false,
  },
  {
    id: 5,
    author: 'Fatima Hassan',
    initials: 'FH',
    title: 'Instagram growth tips that actually work',
    content: "I've grown my Instagram from 500 to 5,000 followers in 3 months. Here's what worked for me...",
    category: 'Tips',
    replies: 25,
    likes: 68,
    time: '2 days ago',
    hasImage: false,
  },
];

const replies = [
  { author: 'John Doe', initials: 'JD', content: 'Great question! I use recycled cardboard boxes and they work really well.', time: '1 hour ago' },
  { author: 'Jane Smith', initials: 'JS', content: 'I recommend checking out biodegradable bubble wrap alternatives.', time: '45 mins ago' },
];

export function Community() {
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [isDiscussionDetailOpen, setIsDiscussionDetailOpen] = useState(false);

  const handleViewDiscussion = (discussion: any) => {
    setSelectedDiscussion(discussion);
    setIsDiscussionDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Community</h1>
          <p className="text-muted-foreground mt-1">Connect with fellow vendors and share knowledge</p>
        </div>
        <Dialog open={isNewDiscussionOpen} onOpenChange={setIsNewDiscussionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
              <Plus className="w-4 h-4 mr-2" />
              Start Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
              <DialogDescription>Share your questions, tips, or showcase your work</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Give your discussion a clear title..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                  <option>Question</option>
                  <option>Tips</option>
                  <option>Showcase</option>
                  <option>General</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Share your thoughts, questions, or tips..." rows={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Add Images (optional)</Label>
                <Input id="image" type="file" multiple accept="image/*" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewDiscussionOpen(false)}>Cancel</Button>
              <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]" onClick={() => setIsNewDiscussionOpen(false)}>
                Post Discussion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Discussions</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{discussions.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-[#4A90E2]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Posts</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>3</p>
              </div>
              <Badge className="bg-[#56A45E]">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Community Members</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>1,247</p>
              </div>
              <Badge className="bg-[#4A90E2]">Growing</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discussions */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Discussions</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
          <TabsTrigger value="showcase">Showcase</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDiscussion(discussion)}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#4A90E2] text-white">
                      {discussion.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg">{discussion.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {discussion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="questions" className="mt-6 space-y-4">
          {discussions.filter(d => d.category === 'Question').map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDiscussion(discussion)}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#4A90E2] text-white">
                      {discussion.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg">{discussion.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {discussion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tips" className="mt-6 space-y-4">
          {discussions.filter(d => d.category === 'Tips').map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDiscussion(discussion)}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#4A90E2] text-white">
                      {discussion.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg">{discussion.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {discussion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="showcase" className="mt-6 space-y-4">
          {discussions.filter(d => d.category === 'Showcase').map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDiscussion(discussion)}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#4A90E2] text-white">
                      {discussion.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg">{discussion.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {discussion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Discussion Detail Modal */}
      <Dialog open={isDiscussionDetailOpen} onOpenChange={setIsDiscussionDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#4A90E2] text-white">
                  {selectedDiscussion?.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{selectedDiscussion?.title}</DialogTitle>
                <DialogDescription>
                  Posted by {selectedDiscussion?.author} • {selectedDiscussion?.time}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedDiscussion && (
            <div className="space-y-6 py-4">
              <div>
                <Badge variant="outline" className="mb-3">{selectedDiscussion.category}</Badge>
                <p className="text-sm">{selectedDiscussion.content}</p>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Like ({selectedDiscussion.likes})
                </Button>
                <span className="text-sm text-muted-foreground">{selectedDiscussion.replies} replies</span>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm mb-4">Replies</h4>
                <div className="space-y-4">
                  {replies.map((reply, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#56A45E] text-white text-xs">
                          {reply.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">{reply.time}</span>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#4A90E2] text-white text-xs">
                      AO
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Input placeholder="Write a reply..." />
                    <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}