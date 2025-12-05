import { useState } from 'react';
import { Search, Filter, Package, Truck, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
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
  DialogFooter,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

const orders = [
  { id: '#10245', customer: 'Sarah Johnson', email: 'sarah.j@email.com', items: 3, amount: 45000, status: 'pending', date: 'Nov 18, 2024', time: '10:30 AM', products: ['Handwoven Basket Set', 'Clay Pottery', 'Beaded Necklace'] },
  { id: '#10244', customer: 'Michael Adekunle', email: 'michael.a@email.com', items: 1, amount: 28500, status: 'processing', date: 'Nov 18, 2024', time: '09:15 AM', products: ['Traditional Ankara Bag'] },
  { id: '#10243', customer: 'Chioma Nwankwo', email: 'chioma.n@email.com', items: 5, amount: 125000, status: 'completed', date: 'Nov 17, 2024', time: '04:45 PM', products: ['Leather Sandals', 'Tie-Dye Fabric', 'Basket Set', 'Pottery', 'Jewelry'] },
  { id: '#10242', customer: 'David Chen', email: 'david.c@email.com', items: 2, amount: 67000, status: 'completed', date: 'Nov 17, 2024', time: '02:20 PM', products: ['Handwoven Basket Set', 'Traditional Ankara Bag'] },
  { id: '#10241', customer: 'Amara Okafor', email: 'amara.o@email.com', items: 1, amount: 12000, status: 'cancelled', date: 'Nov 16, 2024', time: '11:00 AM', products: ['Beaded Jewelry'] },
  { id: '#10240', customer: 'James Williams', email: 'james.w@email.com', items: 4, amount: 89000, status: 'completed', date: 'Nov 16, 2024', time: '09:30 AM', products: ['Pottery Set', 'Fabric Bundle', 'Sandals', 'Basket'] },
];

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#F2994A]';
      case 'processing': return 'bg-[#4A90E2]';
      case 'completed': return 'bg-[#56A45E]';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track all your customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{orderCounts.all}</p>
              </div>
              <Package className="w-8 h-8 text-[#4A90E2]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{orderCounts.pending}</p>
              </div>
              <Badge className="bg-[#F2994A]">{orderCounts.pending}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{orderCounts.processing}</p>
              </div>
              <Badge className="bg-[#4A90E2]">{orderCounts.processing}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>{orderCounts.completed}</p>
              </div>
              <Badge className="bg-[#56A45E]">{orderCounts.completed}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search orders or customers..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({orderCounts.all})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({orderCounts.pending})</TabsTrigger>
              <TabsTrigger value="processing">Processing ({orderCounts.processing})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({orderCounts.completed})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({orderCounts.cancelled})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell style={{ fontFamily: 'Poppins' }}>{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell style={{ fontFamily: 'Poppins' }}>₦{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{order.date}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Complete order information and tracking</DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-sm mt-1">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm mt-1">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="text-sm mt-1">{selectedOrder.date} at {selectedOrder.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={`${getStatusColor(selectedOrder.status)} mt-1`}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="text-sm mb-3">Order Items ({selectedOrder.items})</h3>
                <div className="space-y-2">
                  {selectedOrder.products.map((product: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">{product}</span>
                      </div>
                      <span className="text-sm" style={{ fontFamily: 'Poppins' }}>₦{(selectedOrder.amount / selectedOrder.items).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Order Tracking */}
              <div>
                <h3 className="text-sm mb-3">Order Tracking</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedOrder.status !== 'cancelled' ? 'bg-[#56A45E]' : 'bg-gray-300'}`}>
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm">Order Placed</p>
                      <p className="text-xs text-muted-foreground">{selectedOrder.date} at {selectedOrder.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedOrder.status === 'processing' || selectedOrder.status === 'completed' ? 'bg-[#4A90E2]' : 'bg-gray-300'}`}>
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm">Processing</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedOrder.status === 'processing' || selectedOrder.status === 'completed' ? 'In progress' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedOrder.status === 'completed' ? 'bg-[#56A45E]' : 'bg-gray-300'}`}>
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm">Shipped</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedOrder.status === 'completed' ? 'Delivered' : 'Not yet shipped'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Total */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Amount</span>
                  <span className="text-lg" style={{ fontFamily: 'Poppins' }}>₦{selectedOrder.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedOrder?.status === 'pending' && (
              <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                Mark as Processing
              </Button>
            )}
            {selectedOrder?.status === 'processing' && (
              <Button className="bg-[#56A45E] hover:bg-[#468C4E]">
                Mark as Completed
              </Button>
            )}
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
