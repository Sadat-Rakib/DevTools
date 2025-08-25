import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  isDemo: boolean;
}

interface DemoProfile {
  username: string;
  full_name: string;
  bio: string;
  timezone: string;
  language: string;
  theme: string;
  ui_density: string;
  email_notifications: boolean;
  push_notifications: boolean;
  avatar_url?: string;
  created_at: string;
}

interface DemoSubscription {
  plan_tier: string;
  status: string;
}

interface DemoContextType {
  user: DemoUser | null;
  profile: DemoProfile | null;
  subscription: DemoSubscription | null;
  isGuest: boolean;
  loading: boolean;
  enterDemoMode: () => void;
  continueAsGuest: () => void;
  logout: () => void;
  updateProfile: (data: Partial<DemoProfile>) => Promise<void>;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}

interface DemoProviderProps {
  children: ReactNode;
}

export function DemoProvider({ children }: DemoProviderProps) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock profile data for demo mode
  const profile: DemoProfile | null = user ? {
    username: 'demouser',
    full_name: 'Demo User',
    bio: 'This is a demo profile showcasing the DevTools platform.',
    timezone: 'UTC',
    language: 'en',
    theme: 'light',
    ui_density: 'normal',
    email_notifications: true,
    push_notifications: true,
    avatar_url: undefined,
    created_at: '2024-01-01T00:00:00Z'
  } : null;

  // Mock subscription data for demo mode
  const subscription: DemoSubscription | null = user ? {
    plan_tier: 'pro',
    status: 'active'
  } : null;

  // Check localStorage on mount
  useEffect(() => {
    const demoUser = localStorage.getItem('demo-user');
    const guestMode = localStorage.getItem('guest-mode');
    
    if (demoUser) {
      setUser(JSON.parse(demoUser));
    } else if (guestMode === 'true') {
      setIsGuest(true);
    }
    
    setLoading(false);
  }, []);

  const enterDemoMode = () => {
    const demoUser: DemoUser = {
      id: 'demo-user-001',
      email: 'demo@example.com',
      name: 'Demo User',
      isDemo: true,
    };
    
    setUser(demoUser);
    setIsGuest(false);
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    localStorage.removeItem('guest-mode');
  };

  const continueAsGuest = () => {
    setUser(null);
    setIsGuest(true);
    localStorage.setItem('guest-mode', 'true');
    localStorage.removeItem('demo-user');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('demo-user');
    localStorage.removeItem('guest-mode');
  };

  const updateProfile = async (data: Partial<DemoProfile>) => {
    // Mock profile update - in demo mode, we just simulate success
    console.log('Demo mode: Profile update simulated', data);
    return Promise.resolve();
  };

  const value: DemoContextType = {
    user,
    profile,
    subscription,
    isGuest,
    loading,
    enterDemoMode,
    continueAsGuest,
    logout,
    updateProfile,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}