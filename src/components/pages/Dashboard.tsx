import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, Eye, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { PageType } from '../../App';
import { AISuggestionBanner } from '../AISuggestionBanner';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardProps {
  onNavigate: (page: PageType) => void;
}

const weeklyData = [
  { day: 'Mon', sales: 45000 },
  { day: 'Tue', sales: 52000 },
  { day: 'Wed', sales: 38000 },
  { day: 'Thu', sales: 65000 },
  { day: 'Fri', sales: 72000 },
  { day: 'Sat', sales: 88000 },
  { day: 'Sun', sales: 95000 },
];

const recentOrders = [
  { id: '#10245', customer: 'Sarah Johnson', items: 3, amount: 45000, status: 'pending', time: '10 mins ago' },
  { id: '#10244', customer: 'Michael Adekunle', items: 1, amount: 28500, status: 'processing', time: '25 mins ago' },
  { id: '#10243', customer: 'Chioma Nwankwo', items: 5, amount: 125000, status: 'completed', time: '1 hour ago' },
  { id: '#10242', customer: 'David Chen', items: 2, amount: 67000, status: 'completed', time: '2 hours ago' },
];

const topProducts = [
  { name: 'Handwoven Basket Set', sales: 234, revenue: 585000, trend: 'up' },
  { name: 'Traditional Ankara Bags', sales: 189, revenue: 472500, trend: 'up' },
  { name: 'Beaded Jewelry Collection', sales: 156, revenue: 390000, trend: 'down' },
  { name: 'Leather Sandals', sales: 142, revenue: 355000, trend: 'up' },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const dashboardSuggestions = [
    {
      id: 'weekend-promo',
      type: 'insight' as const,
      title: 'Weekend sales are up 24% - capitalize on this trend!',
      description: 'Your Saturday and Sunday sales show strong performance. Consider running weekend-specific promotions to boost sales even further.',
      action: {
        label: 'View Analytics',
        onClick: () => onNavigate('analytics'),
      },
    },
    {
      id: 'stock-alert',
      type: 'alert' as const,
      title: '2 products are running low on stock',
      description: 'Handwoven Basket Set and Traditional Ankara Bags need restocking to avoid missed sales opportunities.',
      action: {
        label: 'Manage Inventory',
        onClick: () => onNavigate('products'),
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* AI Suggestions */}
      <AISuggestionBanner suggestions={dashboardSuggestions} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome back, Adebayo!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your store today</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">Store Status:</span>
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <Badge className="bg-[#56A45E]">Open</Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Today's Sales</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ fontFamily: 'Poppins' }}>₦95,400</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-[#56A45E]" />
              <span className="text-[#56A45E]">+12.5%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ fontFamily: 'Poppins' }}>24</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-[#56A45E]" />
              <span className="text-[#56A45E]">+8.2%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Products</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ fontFamily: 'Poppins' }}>87</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-[#F2994A]" />
              <span className="text-[#F2994A]">-2</span>
              <span className="text-muted-foreground">out of stock</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Store Views</CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ fontFamily: 'Poppins' }}>1,247</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-[#56A45E]" />
              <span className="text-[#56A45E]">+24.8%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your store with one click</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Button onClick={() => onNavigate('products')} className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
          <Button onClick={() => onNavigate('orders')} variant="outline">
            View Orders
          </Button>
          <Button onClick={() => onNavigate('wallet')} className="bg-[#F2994A] hover:bg-[#E28840]">
            Withdraw Earnings
          </Button>
          <Button onClick={() => onNavigate('analytics')} variant="outline">
            View Analytics
          </Button>
        </CardContent>
      </Card>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
            <CardDescription>Your sales performance this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBED" />
                <XAxis dataKey="day" stroke="#6C757D" />
                <YAxis stroke="#6C757D" />
                <Tooltip 
                  formatter={(value: any) => `₦${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E8EBED' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#4A90E2" strokeWidth={3} dot={{ fill: '#4A90E2', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best sellers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ fontFamily: 'Poppins' }}>₦{product.revenue.toLocaleString()}</p>
                    <div className="flex items-center justify-end gap-1">
                      {product.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-[#56A45E]" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-[#F2994A]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onNavigate('orders')}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm" style={{ fontFamily: 'Poppins' }}>{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm">{order.items} items</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <p className="text-sm" style={{ fontFamily: 'Poppins' }}>₦{order.amount.toLocaleString()}</p>
                  <Badge 
                    className={
                      order.status === 'completed' ? 'bg-[#56A45E]' :
                      order.status === 'processing' ? 'bg-[#4A90E2]' :
                      'bg-[#F2994A]'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}