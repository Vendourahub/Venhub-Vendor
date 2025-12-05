import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const upcomingEvents = [
  {
    id: 1,
    title: 'Product Photography Masterclass',
    date: 'Nov 25, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Virtual (Zoom)',
    instructor: 'Oluwaseun Adeyemi',
    price: 15000,
    spots: 12,
    totalSpots: 50,
    category: 'Photography',
    description: 'Learn professional product photography techniques to showcase your products in the best light.',
    thumbnail: 'photography workshop studio',
  },
  {
    id: 2,
    title: 'Building Your Brand Story',
    date: 'Nov 28, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Lagos Innovation Hub',
    instructor: 'Chioma Nwankwo',
    price: 20000,
    spots: 8,
    totalSpots: 30,
    category: 'Branding',
    description: 'Create a compelling brand narrative that resonates with your target audience.',
    thumbnail: 'branding workshop business',
  },
  {
    id: 3,
    title: 'Social Media Marketing for Vendors',
    date: 'Dec 2, 2024',
    time: '11:00 AM - 3:00 PM',
    location: 'Virtual (Zoom)',
    instructor: 'Fatima Hassan',
    price: 12000,
    spots: 25,
    totalSpots: 100,
    category: 'Marketing',
    description: 'Master Instagram, Facebook, and TikTok strategies to grow your customer base.',
    thumbnail: 'social media marketing',
  },
  {
    id: 4,
    title: 'Customer Service Excellence',
    date: 'Dec 5, 2024',
    time: '9:00 AM - 12:00 PM',
    location: 'Abuja Business Center',
    instructor: 'Michael Eze',
    price: 10000,
    spots: 15,
    totalSpots: 40,
    category: 'Business',
    description: 'Learn how to provide exceptional customer service that builds loyalty.',
    thumbnail: 'customer service training',
  },
];

const myRegisteredEvents = [
  {
    id: 2,
    title: 'Building Your Brand Story',
    date: 'Nov 28, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Lagos Innovation Hub',
    status: 'confirmed',
  },
];

export function EventWorkshop() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setIsRegisterModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Event Workshop</h1>
        <p className="text-muted-foreground mt-1">Join workshops and events to grow your skills</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{upcomingEvents.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-[#4A90E2]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">My Registrations</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{myRegisteredEvents.length}</p>
              </div>
              <Badge className="bg-[#56A45E]">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Events Attended</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>5</p>
              </div>
              <Users className="w-8 h-8 text-[#F2994A]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="registered">My Registered Events</TabsTrigger>
        </TabsList>

        {/* Upcoming Events */}
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback 
                    src={`https://source.unsplash.com/600x250/?${event.thumbnail}`}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-[#4A90E2]">{event.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.spots} of {event.totalSpots} spots available</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl" style={{ fontFamily: 'Poppins' }}>₦{event.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Instructor</p>
                        <p className="text-sm">{event.instructor}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]"
                      onClick={() => handleRegisterClick(event)}
                    >
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Registered Events */}
        <TabsContent value="registered" className="mt-6">
          {myRegisteredEvents.length > 0 ? (
            <div className="space-y-4">
              {myRegisteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg">{event.title}</h3>
                          <Badge className="bg-[#56A45E]">{event.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">View Details</Button>
                        <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">Get Directions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg mb-2">No Registered Events</h3>
                  <p className="text-muted-foreground mb-6">You haven't registered for any events yet</p>
                  <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                    Browse Upcoming Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Registration Modal */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Register for Workshop</DialogTitle>
            <DialogDescription>Complete your registration for {selectedEvent?.title}</DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Event</p>
                  <p className="text-sm mt-1">{selectedEvent.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="text-sm mt-1">{selectedEvent.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="text-sm mt-1">{selectedEvent.date}</p>
                  <p className="text-xs text-muted-foreground">{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm mt-1">{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Spots</p>
                  <p className="text-sm mt-1">{selectedEvent.spots} of {selectedEvent.totalSpots}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-lg mt-1" style={{ fontFamily: 'Poppins' }}>₦{selectedEvent.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 bg-[#EBF4FC] rounded-lg">
                <h4 className="text-sm mb-2">What you'll learn:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Professional techniques and best practices</li>
                  <li>• Hands-on practical exercises</li>
                  <li>• Q&A session with the instructor</li>
                  <li>• Certificate of completion</li>
                  <li>• Access to exclusive resources</li>
                </ul>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Registration Fee</span>
                  <span className="text-lg" style={{ fontFamily: 'Poppins' }}>₦{selectedEvent.price.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Payment will be deducted from your Vendoura wallet</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRegisterModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]" onClick={() => setIsRegisterModalOpen(false)}>
              Confirm Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
