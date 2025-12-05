import { useState } from 'react';
import { Wallet as WalletIcon, TrendingUp, Download, Plus, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AISuggestionBanner } from '../AISuggestionBanner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const earningsData = [
  { month: 'Jun', earnings: 125000 },
  { month: 'Jul', earnings: 185000 },
  { month: 'Aug', earnings: 210000 },
  { month: 'Sep', earnings: 245000 },
  { month: 'Oct', earnings: 290000 },
  { month: 'Nov', earnings: 340000 },
];

const withdrawalHistory = [
  { id: 1, amount: 150000, date: 'Nov 15, 2024', status: 'completed', method: 'Bank Transfer', reference: 'WD-2024-1523' },
  { id: 2, amount: 200000, date: 'Nov 1, 2024', status: 'completed', method: 'Bank Transfer', reference: 'WD-2024-1487' },
  { id: 3, amount: 125000, date: 'Oct 15, 2024', status: 'completed', method: 'Bank Transfer', reference: 'WD-2024-1398' },
  { id: 4, amount: 180000, date: 'Oct 1, 2024', status: 'completed', method: 'Bank Transfer', reference: 'WD-2024-1312' },
];

const transactions = [
  { id: 1, type: 'credit', description: 'Order #10245 - Sarah Johnson', amount: 45000, date: 'Nov 18, 2024' },
  { id: 2, type: 'credit', description: 'Order #10244 - Michael Adekunle', amount: 28500, date: 'Nov 18, 2024' },
  { id: 3, type: 'debit', description: 'Withdrawal to Bank Account', amount: -150000, date: 'Nov 15, 2024' },
  { id: 4, type: 'credit', description: 'Order #10243 - Chioma Nwankwo', amount: 125000, date: 'Nov 17, 2024' },
  { id: 5, type: 'credit', description: 'Order #10242 - David Chen', amount: 67000, date: 'Nov 17, 2024' },
];

export function Wallet() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);

  const availableBalance = 285000;
  const totalEarnings = 1395000;
  const pendingClearance = 45000;

  const walletSuggestions = [
    {
      id: 'early-withdrawal',
      type: 'tip' as const,
      title: 'You have ₦285,000 ready for withdrawal',
      description: 'Your funds have cleared and are available for immediate withdrawal. Regular withdrawals help maintain healthy cash flow for your business.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* AI Suggestions */}
      <AISuggestionBanner suggestions={walletSuggestions} />

      {/* Header */}
      <div>
        <h1>Wallet & Earnings</h1>
        <p className="text-muted-foreground mt-1">Manage your funds and track your earnings</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#4A90E2] to-[#357ABD] text-white">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm opacity-90">Available Balance</p>
              <p className="text-3xl mt-2" style={{ fontFamily: 'Poppins' }}>₦{availableBalance.toLocaleString()}</p>
              <Button 
                className="mt-4 bg-white text-[#4A90E2] hover:bg-gray-100"
                onClick={() => setIsWithdrawModalOpen(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl mt-2" style={{ fontFamily: 'Poppins' }}>₦{totalEarnings.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-[#56A45E]" />
                  <span className="text-[#56A45E]">+18.5%</span>
                  <span className="text-muted-foreground">this month</span>
                </div>
              </div>
              <WalletIcon className="w-10 h-10 text-[#4A90E2]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Clearance</p>
                <p className="text-2xl mt-2" style={{ fontFamily: 'Poppins' }}>₦{pendingClearance.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Available in 2-3 business days
                </p>
              </div>
              <Badge className="bg-[#F2994A]">Pending</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
          <CardDescription>Your earnings over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EBED" />
              <XAxis dataKey="month" stroke="#6C757D" />
              <YAxis stroke="#6C757D" />
              <Tooltip 
                formatter={(value: any) => `₦${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E8EBED' }}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#4A90E2" 
                strokeWidth={3} 
                dot={{ fill: '#4A90E2', r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions and Withdrawal History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>
                  </div>
                  <p className={`text-sm ${transaction.type === 'credit' ? 'text-[#56A45E]' : 'text-red-600'}`} style={{ fontFamily: 'Poppins' }}>
                    {transaction.type === 'credit' ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>Your withdrawal records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {withdrawalHistory.map((withdrawal) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="text-sm" style={{ fontFamily: 'Poppins' }}>{withdrawal.reference}</p>
                    <p className="text-xs text-muted-foreground mt-1">{withdrawal.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ fontFamily: 'Poppins' }}>₦{withdrawal.amount.toLocaleString()}</p>
                    <Badge className="bg-[#56A45E] mt-1 text-xs">{withdrawal.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bank Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bank Accounts</CardTitle>
              <CardDescription>Manage your withdrawal methods</CardDescription>
            </div>
            <Dialog open={isAddBankModalOpen} onOpenChange={setIsAddBankModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bank Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Bank Account</DialogTitle>
                  <DialogDescription>Enter your bank account details for withdrawals</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Select your bank" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" placeholder="0123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input id="accountName" placeholder="Adebayo Oluwaseun" disabled value="Adebayo Oluwaseun" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBankModalOpen(false)}>Cancel</Button>
                  <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]" onClick={() => setIsAddBankModalOpen(false)}>
                    Add Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4A90E2] rounded-lg flex items-center justify-center text-white">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm">GTBank - 0123456789</p>
                  <p className="text-xs text-muted-foreground">Adebayo Oluwaseun</p>
                </div>
              </div>
              <Badge className="bg-[#56A45E]">Primary</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdraw Modal */}
      <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>Transfer money from your wallet to your bank account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>₦{availableBalance.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount (₦)</Label>
              <Input id="amount" type="number" placeholder="Enter amount" />
              <p className="text-xs text-muted-foreground">Minimum withdrawal: ₦5,000</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank">Withdraw To</Label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                <option>GTBank - 0123456789 (Primary)</option>
              </select>
            </div>
            <div className="p-4 bg-[#EBF4FC] rounded-lg">
              <h4 className="text-sm mb-2">Withdrawal Information</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Funds will be transferred within 1-2 business days</li>
                <li>• No withdrawal fees</li>
                <li>• You'll receive an email confirmation</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]" onClick={() => setIsWithdrawModalOpen(false)}>
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}