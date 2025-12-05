import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { toast } from "sonner";

import { Separator } from './ui/separator';

interface AuthModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultRole?: UserRole;
}

const DEMO_USERS: Record<UserRole, { email: string; pass: string; name: string }> = {
  vendor: { email: 'vendor@vendoura.ng', pass: 'password123', name: 'Demo Vendor' },
  customer: { email: 'customer@vendoura.ng', pass: 'password123', name: 'Demo Customer' },
  educator: { email: 'educator@vendoura.ng', pass: 'password123', name: 'Demo Educator' },
  investor: { email: 'investor@vendoura.ng', pass: 'password123', name: 'Demo Investor' },
  admin: { email: 'admin@vendoura.ng', pass: 'password123', name: 'Demo Admin' },
  guest: { email: 'guest@vendoura.ng', pass: 'password123', name: 'Guest' }
};

export function AuthModal({ trigger, open, onOpenChange, defaultRole = 'customer' }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleDemoLogin = async (role: UserRole) => {
    if (role === 'guest') return; // or handle guest specifically
    const demoUser = DEMO_USERS[role];
    if (!demoUser) return;

    setIsLoading(true);
    try {
      // Try login first
      try {
        await login(demoUser.email, demoUser.pass);
        toast.success(`Welcome back, ${demoUser.name}!`);
        onOpenChange?.(false);
        return;
      } catch (loginError: any) {
        // If login fails, try to signup
        console.log('Login failed, attempting signup for demo user...', loginError);
        await signup(demoUser.email, demoUser.pass, demoUser.name, role);
        toast.success(`Demo account created: ${demoUser.name}`);
        onOpenChange?.(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`Demo login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      onOpenChange?.(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(email, password, name, defaultRole);
      toast.success('Account created successfully!');
      onOpenChange?.(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === 'login' 
              ? 'Enter your credentials to access your account.' 
              : 'Fill in your details to create a new account.'}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Quick Access (Dev)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full text-xs" 
                  onClick={() => handleDemoLogin('vendor')}
                  disabled={isLoading}
                >
                  Vendor Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-xs" 
                  onClick={() => handleDemoLogin('customer')}
                  disabled={isLoading}
                >
                  Customer Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-xs" 
                  onClick={() => handleDemoLogin('educator')}
                  disabled={isLoading}
                >
                  Educator Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-xs" 
                  onClick={() => handleDemoLogin('investor')}
                  disabled={isLoading}
                >
                  Investor Demo
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  placeholder="John Doe" 
                  required 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Signing up as {defaultRole}
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
