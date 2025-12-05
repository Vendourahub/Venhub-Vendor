import { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { AISuggestionBanner } from '../AISuggestionBanner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const salesData = [
  { date: 'Nov 1', sales: 45000, orders: 12 },
  { date: 'Nov 3', sales: 52000, orders: 15 },
  { date: 'Nov 5', sales: 38000, orders: 10 },
  { date: 'Nov 7', sales: 65000, orders: 18 },
  { date: 'Nov 9', sales: 72000, orders: 20 },
  { date: 'Nov 11', sales: 88000, orders: 24 },
  { date: 'Nov 13', sales: 95000, orders: 26 },
  { date: 'Nov 15', sales: 110000, orders: 30 },
];

const productPerformance = [
  { name: 'Handwoven Baskets', value: 35, sales: 585000 },
  { name: 'Ankara Bags', value: 25, sales: 472500 },
  { name: 'Beaded Jewelry', value: 20, sales: 390000 },
  { name: 'Leather Sandals', value: 15, sales: 355000 },
  { name: 'Others', value: 5, sales: 125000 },
];

const trafficSources = [
  { source: 'Direct', visitors: 1247, percentage: 35 },
  { source: 'Social Media', visitors: 856, percentage: 24 },
  { source: 'Search Engine', visitors: 712, percentage: 20 },
  { source: 'Referral', visitors: 534, percentage: 15 },
  { source: 'Email', visitors: 213, percentage: 6 },
];

const customerDemographics = [
  { age: '18-24', male: 120, female: 180 },
  { age: '25-34', male: 250, female: 320 },
  { age: '35-44', male: 180, female: 210 },
  { age: '45-54', male: 90, female: 110 },
  { age: '55+', male: 45, female: 65 },
];

const COLORS = ['#4A90E2', '#56A45E', '#F2994A', '#F5C33C', '#9B59B6'];

export function Analytics() {
  const [dateRange, setDateRange] = useState('7days');

  const analyticsSuggestions = [
    {
      id: 'conversion-drop',
      type: 'alert' as const,
      title: 'Your conversion rate dropped 2.3% this week',
      description: 'This decline correlates with increased cart abandonment. Consider implementing exit-intent popups or follow-up emails to recover lost sales.',
    },
    {
      id: 'peak-hours',
      type: 'insight' as const,
      title: 'Your customers are most active between 6-9 PM',
      description: 'Schedule your product launches and promotions during these peak hours to maximize visibility and engagement.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* AI Suggestions */}
      <AISuggestionBanner suggestions={analyticsSuggestions} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your business performance and insights</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl mt-2" style={{ fontFamily: 'Poppins' }}>₦565,000</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-[#56A45E]" />
                <span className="text-[#56A45E]">+18.2%</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl mt-2" style={{ fontFamily: 'Poppins' }}>165</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-[#56A45E]" />
                <span className="text-[#56A45E]">+12.5%</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Average Order Value</p>
              <p className="text-2xl mt-2" style={{ fontFamily: 'Poppins' }}>₦3,424</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-[#56A45E]" />
                <span className="text-[#56A45E]">+5.1%</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl mt-2" style={{ fontFamily: 'Poppins' }}>4.8%</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingDown className="w-4 h-4 text-[#F2994A]" />
                <span className="text-[#F2994A]">-2.3%</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Revenue and orders over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBED" />
                <XAxis dataKey="date" stroke="#6C757D" />
                <YAxis stroke="#6C757D" />
                <Tooltip 
                  formatter={(value: any) => `₦${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E8EBED' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#4A90E2" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Sales distribution by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [
                    `₦${props.payload.sales.toLocaleString()}`,
                    'Revenue'
                  ]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E8EBED' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Demographics and Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Demographics</CardTitle>
            <CardDescription>Age and gender distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerDemographics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBED" />
                <XAxis dataKey="age" stroke="#6C757D" />
                <YAxis stroke="#6C757D" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E8EBED' }}
                />
                <Legend />
                <Bar dataKey="male" fill="#4A90E2" name="Male" />
                <Bar dataKey="female" fill="#F2994A" name="Female" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins' }}>
                        {source.visitors}
                      </span>
                      <span className="text-sm" style={{ fontFamily: 'Poppins' }}>
                        {source.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${source.percentage}%`,
                        backgroundColor: COLORS[index]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best selling products this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productPerformance.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: COLORS[index] }}
                  >
                    <span className="text-lg" style={{ fontFamily: 'Poppins' }}>#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.value}% of total sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ fontFamily: 'Poppins' }}>₦{product.sales.toLocaleString()}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <TrendingUp className="w-3 h-3 text-[#56A45E]" />
                    <span className="text-xs text-[#56A45E]">+12%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}