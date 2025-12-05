import { Search, Bell, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';

export function TopBar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search products, orders, customers..." 
            className="pl-10 bg-input-background border-0"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#F2994A] rounded-full"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-sm">New Order #10245</span>
                  <Badge variant="secondary" className="text-xs">New</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sarah Johnson placed an order for ₦45,000
                </p>
                <span className="text-xs text-muted-foreground mt-1">2 minutes ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-sm">Low Stock Alert</span>
                  <Badge variant="destructive" className="text-xs">Alert</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  "Handwoven Basket" has only 3 items left
                </p>
                <span className="text-xs text-muted-foreground mt-1">1 hour ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-sm">Payment Received</span>
                  <Badge className="text-xs bg-[#56A45E]">Success</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  ₦125,000 has been deposited to your wallet
                </p>
                <span className="text-xs text-muted-foreground mt-1">3 hours ago</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-muted px-3 py-2 rounded-lg transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-[#4A90E2] text-white">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden md:block">
              <p className="text-sm">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">ID: {user?.vendorId || 'N/A'}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p>{user?.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
                <Badge className="mt-2 bg-[#56A45E] capitalize">{user?.role || 'User'}</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Store Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing & Payments</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => logout()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
