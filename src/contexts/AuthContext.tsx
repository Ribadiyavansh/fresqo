import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isAuthModalOpen: boolean;
    authModalMode: 'login' | 'signup';
    authModalRedirect: string | null;
    openAuthModal: (mode: 'login' | 'signup', redirect?: string) => void;
    closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Modal State
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
    const [authModalRedirect, setAuthModalRedirect] = useState<string | null>(null);

    useEffect(() => {
        // Check for existing session
        const token = localStorage.getItem('fresqo_token');
        const storedUser = localStorage.getItem('fresqo_user');

        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Failed to parse user data from local storage');
                localStorage.removeItem('fresqo_user');
                localStorage.removeItem('fresqo_token');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem('fresqo_token', token);
        localStorage.setItem('fresqo_user', JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('fresqo_token');
        localStorage.removeItem('fresqo_user');
        setUser(null);
        setIsLoggedIn(false);
    };

    const openAuthModal = (mode: 'login' | 'signup' = 'login', redirect?: string) => {
        setAuthModalMode(mode);
        setAuthModalRedirect(redirect || null);
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        // Don't clear redirect immediately so exit animations can complete
        setTimeout(() => {
            setAuthModalRedirect(null);
        }, 300);
    };

    if (isLoading) {
        return null; // or a loading spinner if preferred
    }

    return (
        <AuthContext.Provider value={{
            user, isLoggedIn, login, logout,
            isAuthModalOpen, authModalMode, authModalRedirect,
            openAuthModal, closeAuthModal
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
