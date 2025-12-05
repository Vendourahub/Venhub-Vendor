import { 
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, 
  GraduationCap, Calendar, MessageSquare, Wallet, Mail, 
  Settings, HeadphonesIcon, LogOut, Sparkles 
} from 'lucide-react';
import { PageType } from '../App';
import Logo from '../imports/Logo';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Separator } from './ui/separator';

interface SidebarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

interface NavItem {
  id: PageType;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'products', label: 'My Products', icon: <Package className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'learning-hub', label: 'Learning Hub', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'event-workshop', label: 'Event Workshop', icon: <Calendar className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'wallet', label: 'Wallet & Earnings', icon: <Wallet className="w-5 h-5" /> },
  ];

  const bottomNavItems: NavItem[] = [
    { id: 'messages', label: 'Messages', icon: <Mail className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'support', label: 'Support', icon: <HeadphonesIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="h-[27px] w-[162.553px]">
          <Logo />
        </div>
        <p className="text-xs text-muted-foreground mt-1">Vendor Dashboard</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activePage === item.id
                  ? 'bg-[#4A90E2] text-white shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <Separator className="my-4 mx-3" />

        {/* Bottom Navigation */}
        <div className="space-y-1 px-3">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activePage === item.id
                  ? 'bg-[#4A90E2] text-white shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out of your Vendoura vendor account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
}