import { useState } from 'react';
import { Search, Play, FileText, BookOpen, TrendingUp, Camera, Users, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const categories = [
  { id: 'branding', name: 'Branding', icon: <Award className="w-5 h-5" />, count: 12 },
  { id: 'photography', name: 'Photography', icon: <Camera className="w-5 h-5" />, count: 8 },
  { id: 'marketing', name: 'Marketing', icon: <TrendingUp className="w-5 h-5" />, count: 15 },
  { id: 'customer-service', name: 'Customer Service', icon: <Users className="w-5 h-5" />, count: 10 },
];

const resources = [
  { id: 1, title: 'Building Your Brand Identity', type: 'video', category: 'branding', duration: '12:45', progress: 75, thumbnail: 'branding workshop business' },
  { id: 2, title: 'Product Photography Basics', type: 'video', category: 'photography', duration: '18:30', progress: 0, thumbnail: 'product photography studio' },
  { id: 3, title: 'Social Media Marketing Guide', type: 'pdf', category: 'marketing', pages: 24, progress: 100, thumbnail: 'social media marketing' },
  { id: 4, title: 'Handling Customer Complaints', type: 'video', category: 'customer-service', duration: '15:20', progress: 30, thumbnail: 'customer service support' },
  { id: 5, title: 'Pricing Your Products Right', type: 'pdf', category: 'marketing', pages: 16, progress: 0, thumbnail: 'pricing strategy business' },
  { id: 6, title: 'Creating Compelling Product Descriptions', type: 'video', category: 'marketing', duration: '10:15', progress: 0, thumbnail: 'writing content marketing' },
  { id: 7, title: 'Email Marketing for Vendors', type: 'pdf', category: 'marketing', pages: 20, progress: 50, thumbnail: 'email marketing' },
  { id: 8, title: 'Packaging and Presentation Tips', type: 'video', category: 'branding', duration: '14:00', progress: 0, thumbnail: 'product packaging design' },
];

const quickTips = [
  { title: 'Update product photos regularly', category: 'Photography', color: '#4A90E2' },
  { title: 'Respond to customers within 2 hours', category: 'Customer Service', color: '#56A45E' },
  { title: 'Use hashtags effectively on social media', category: 'Marketing', color: '#F2994A' },
  { title: 'Keep your brand voice consistent', category: 'Branding', color: '#F5C33C' },
];

export function LearningHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenResource = (resource: any) => {
    setSelectedResource(resource);
    setIsResourceModalOpen(true);
  };

  const inProgressResources = resources.filter(r => r.progress > 0 && r.progress < 100);
  const completedCount = resources.filter(r => r.progress === 100).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Learning Hub</h1>
        <p className="text-muted-foreground mt-1">Grow your business with expert resources and guides</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Resources</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{resources.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#4A90E2]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{inProgressResources.length}</p>
              </div>
              <Play className="w-8 h-8 text-[#F2994A]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{completedCount}</p>
              </div>
              <Award className="w-8 h-8 text-[#56A45E]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      {inProgressResources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgressResources.map((resource) => (
                <div key={resource.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => handleOpenResource(resource)}>
                  <ImageWithFallback 
                    src={`https://source.unsplash.com/100x100/?${resource.thumbnail}`}
                    alt={resource.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {resource.type === 'video' ? <Play className="w-4 h-4 text-[#4A90E2]" /> : <FileText className="w-4 h-4 text-[#F2994A]" />}
                      <p className="text-sm">{resource.title}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={resource.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground" style={{ fontFamily: 'Poppins' }}>{resource.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={`cursor-pointer transition-all ${activeCategory === category.id ? 'border-[#4A90E2] bg-[#EBF4FC]' : 'hover:border-muted-foreground/30'}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#4A90E2] flex items-center justify-center text-white">
                    {category.icon}
                  </div>
                  <div>
                    <p className="text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.count} resources</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search resources..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {activeCategory !== 'all' && (
          <Button variant="outline" onClick={() => setActiveCategory('all')}>
            Clear Filter
          </Button>
        )}
      </div>

      {/* Resources Grid */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="pdf">Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleOpenResource(resource)}>
                <div className="relative">
                  <ImageWithFallback 
                    src={`https://source.unsplash.com/400x200/?${resource.thumbnail}`}
                    alt={resource.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={resource.type === 'video' ? 'bg-[#4A90E2]' : 'bg-[#F2994A]'}>
                      {resource.type === 'video' ? 'Video' : 'PDF'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-sm mb-2">{resource.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{resource.type === 'video' ? resource.duration : `${resource.pages} pages`}</span>
                    {resource.progress > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {resource.progress === 100 ? 'Completed' : `${resource.progress}% done`}
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]" size="sm">
                    {resource.progress === 0 ? 'Start Learning' : resource.progress === 100 ? 'Review' : 'Continue'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => r.type === 'video').map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleOpenResource(resource)}>
                <div className="relative">
                  <ImageWithFallback 
                    src={`https://source.unsplash.com/400x200/?${resource.thumbnail}`}
                    alt={resource.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-[#4A90E2]">Video</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-sm mb-2">{resource.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{resource.duration}</span>
                    {resource.progress > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {resource.progress === 100 ? 'Completed' : `${resource.progress}% done`}
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]" size="sm">
                    {resource.progress === 0 ? 'Start Learning' : resource.progress === 100 ? 'Review' : 'Continue'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pdf" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => r.type === 'pdf').map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleOpenResource(resource)}>
                <div className="relative">
                  <ImageWithFallback 
                    src={`https://source.unsplash.com/400x200/?${resource.thumbnail}`}
                    alt={resource.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-[#F2994A]">PDF</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h4 className="text-sm mb-2">{resource.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{resource.pages} pages</span>
                    {resource.progress > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {resource.progress === 100 ? 'Completed' : `${resource.progress}% done`}
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]" size="sm">
                    {resource.progress === 0 ? 'Start Reading' : resource.progress === 100 ? 'Review' : 'Continue'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
          <CardDescription>Expert advice for vendor success</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: tip.color }} />
                <div className="flex-1">
                  <p className="text-sm">{tip.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{tip.category}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Modal */}
      <Dialog open={isResourceModalOpen} onOpenChange={setIsResourceModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedResource?.title}</DialogTitle>
            <DialogDescription>
              {selectedResource?.type === 'video' ? `Duration: ${selectedResource?.duration}` : `${selectedResource?.pages} pages`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              {selectedResource?.type === 'video' ? (
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto text-[#4A90E2] mb-4" />
                  <p className="text-muted-foreground">Video player would appear here</p>
                </div>
              ) : (
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto text-[#F2994A] mb-4" />
                  <p className="text-muted-foreground">PDF viewer would appear here</p>
                </div>
              )}
            </div>
            {selectedResource?.progress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Your Progress</span>
                  <span style={{ fontFamily: 'Poppins' }}>{selectedResource?.progress}%</span>
                </div>
                <Progress value={selectedResource?.progress} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
