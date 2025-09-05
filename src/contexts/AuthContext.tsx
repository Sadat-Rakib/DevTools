import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextType = {
    session: Session | null;
    signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
    signUp: (email: string, password: string) => Promise<{ data: any; error: any }>;
    signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = (email: string, password: string) =>
        supabase.auth.signInWithPassword({ email, password });

    const signUp = (email: string, password: string) =>
        supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + '/login' } });

    const signOut = () => supabase.auth.signOut();

    return (
        <AuthContext.Provider value={{ session, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};