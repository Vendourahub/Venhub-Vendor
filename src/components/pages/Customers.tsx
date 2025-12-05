import { useState } from 'react';
import { Search, User, ShoppingBag, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

const customers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', orders: 12, totalSpent: 340000, lastOrder: 'Nov 18, 2024', status: 'VIP', initials: 'SJ' },
  { id: 2, name: 'Michael Adekunle', email: 'michael.a@email.com', orders: 8, totalSpent: 185000, lastOrder: 'Nov 18, 2024', status: 'Regular', initials: 'MA' },
  { id: 3, name: 'Chioma Nwankwo', email: 'chioma.n@email.com', orders: 15, totalSpent: 425000, lastOrder: 'Nov 17, 2024', status: 'VIP', initials: 'CN' },
  { id: 4, name: 'David Chen', email: 'david.c@email.com', orders: 5, totalSpent: 125000, lastOrder: 'Nov 17, 2024', status: 'Regular', initials: 'DC' },
  { id: 5, name: 'Amara Okafor', email: 'amara.o@email.com', orders: 3, totalSpent: 67000, lastOrder: 'Nov 16, 2024', status: 'New', initials: 'AO' },
  { id: 6, name: 'James Williams', email: 'james.w@email.com', orders: 10, totalSpent: 285000, lastOrder: 'Nov 16, 2024', status: 'Regular', initials: 'JW' },
  { id: 7, name: 'Fatima Hassan', email: 'fatima.h@email.com', orders: 18, totalSpent: 520000, lastOrder: 'Nov 15, 2024', status: 'VIP', initials: 'FH' },
  { id: 8, name: 'John Doe', email: 'john.d@email.com', orders: 2, totalSpent: 45000, lastOrder: 'Nov 14, 2024', status: 'New', initials: 'JD' },
];

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  const vipCount = customers.filter(c => c.status === 'VIP').length;
  const regularCount = customers.filter(c => c.status === 'Regular').length;
  const newCount = customers.filter(c => c.status === 'New').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Customers</h1>
        <p className="text-muted-foreground mt-1">Manage your customer relationships</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{customers.length}</p>
              </div>
              <User className="w-8 h-8 text-[#4A90E2]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">VIP Customers</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{vipCount}</p>
              </div>
              <Badge className="bg-[#F5C33C] text-foreground">VIP</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Regular</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{regularCount}</p>
              </div>
              <Badge className="bg-[#4A90E2]">Regular</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Customers</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{newCount}</p>
              </div>
              <Badge className="bg-[#56A45E]">New</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Customers</CardTitle>
            <div className="flex-1 max-w-sm ml-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search customers..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#4A90E2] text-white">
                          {customer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                  <TableCell style={{ fontFamily: 'Poppins' }}>{customer.orders}</TableCell>
                  <TableCell style={{ fontFamily: 'Poppins' }}>₦{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Badge className={
                      customer.status === 'VIP' ? 'bg-[#F5C33C] text-foreground' :
                      customer.status === 'New' ? 'bg-[#56A45E]' :
                      'bg-[#4A90E2]'
                    }>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewCustomer(customer)}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>Complete customer information and order history</DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#4A90E2] text-white text-xl">
                    {selectedCustomer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3>{selectedCustomer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  <Badge className={`mt-2 ${
                    selectedCustomer.status === 'VIP' ? 'bg-[#F5C33C] text-foreground' :
                    selectedCustomer.status === 'New' ? 'bg-[#56A45E]' :
                    'bg-[#4A90E2]'
                  }`}>
                    {selectedCustomer.status} Customer
                  </Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <ShoppingBag className="w-6 h-6 mx-auto text-[#4A90E2] mb-2" />
                      <p className="text-2xl" style={{ fontFamily: 'Poppins' }}>{selectedCustomer.orders}</p>
                      <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <DollarSign className="w-6 h-6 mx-auto text-[#56A45E] mb-2" />
                      <p className="text-2xl" style={{ fontFamily: 'Poppins' }}>₦{(selectedCustomer.totalSpent / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-muted-foreground mt-1">Total Spent</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Calendar className="w-6 h-6 mx-auto text-[#F2994A] mb-2" />
                      <p className="text-sm mt-2" style={{ fontFamily: 'Poppins' }}>{selectedCustomer.lastOrder}</p>
                      <p className="text-xs text-muted-foreground mt-1">Last Order</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <div>
                <h4 className="text-sm mb-3">Recent Orders</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm" style={{ fontFamily: 'Poppins' }}>#{10245 - index}</p>
                        <p className="text-xs text-muted-foreground">Nov {18 - index}, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm" style={{ fontFamily: 'Poppins' }}>₦{(45000 + index * 5000).toLocaleString()}</p>
                        <Badge className="bg-[#56A45E] text-xs mt-1">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>+234 803 123 4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="text-right">123 Lagos Street, Victoria Island, Lagos</span>
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
