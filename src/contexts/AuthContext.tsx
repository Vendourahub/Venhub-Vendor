import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'guest' | 'customer' | 'vendor' | 'educator' | 'investor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  vendorId?: string;
  storeName?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'guest-user',
    name: 'Guest User',
    email: 'guest@vendoura.com',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);

  const mapUser = (sbUser: SupabaseUser): User => {
    const metadata = sbUser.user_metadata || {};
    return {
      id: sbUser.id,
      name: metadata.name || sbUser.email?.split('@')[0] || 'User',
      email: sbUser.email || '',
      role: (metadata.role as UserRole) || 'customer',
      profileImage: metadata.profileImage,
      vendorId: metadata.vendorId,
      storeName: metadata.storeName
    };
  };

  useEffect(() => {
    // Authentication disabled - no session checks
    // User is already set in initial state
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error('Signup failed');

    // User is automatically logged in after signup
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const switchRole = async (newRole: UserRole) => {
    // Simplified role switching without authentication
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    const { role, id, email, ...metadataUpdates } = updates;
    
    const { data, error } = await supabase.auth.updateUser({
      data: metadataUpdates
    });

    if (error) throw error;
    if (data.user) {
      setUser(mapUser(data.user));
    }
  };

  const value = {
    user,
    role: user?.role || 'guest',
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    switchRole,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
