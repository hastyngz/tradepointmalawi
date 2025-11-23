import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, signUpWithEmail, loginWithEmail, signOut, createUserProfile, getUserProfile } from '@/src/services/firebase';

type AuthContextType = {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signup: (email: string, password: string, role: string, extra?: any) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        const p = await getUserProfile(u.uid);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function signup(email: string, password: string, role = 'user', extra: any = {}) {
    const u = await signUpWithEmail(email, password);
    const data = { email, role, ...extra };
    await createUserProfile(u.uid, data);
    setProfile(data);
    return u;
  }

  async function login(email: string, password: string) {
    const u = await loginWithEmail(email, password);
    const p = await getUserProfile(u.uid);
    setProfile(p);
    return u;
  }

  async function logout() {
    await signOut();
    setProfile(null);
  }

  async function refreshProfile() {
    if (user) {
      const p = await getUserProfile(user.uid);
      setProfile(p);
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
