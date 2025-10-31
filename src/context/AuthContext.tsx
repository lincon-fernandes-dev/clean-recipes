// src/context/AuthContext.tsx
'use client';

import { User } from '@/@core/domain/entities/User';
import { IUser } from '@/Domain/Interfaces/IUser';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_STORAGE_KEY = 'recipe_app_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Inicialização: Apenas lê o sessionStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSession) {
          const { email } = JSON.parse(storedSession);
          const user = new User({
            id: 'u1',
            name: 'user',
            email: email,
            avatar: '',
            isVerified: true,
          });
          setUser(user);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar sessão do storage:', error);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Funções login e logout (mantidas)
  const login = useCallback((email: string, token: string) => {
    const newUser = new User({
      id: 'u1',
      name: 'user',
      email: email,
      avatar: '',
      isVerified: true,
    });
    setUser(newUser);
    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({ email, token })
    );
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
