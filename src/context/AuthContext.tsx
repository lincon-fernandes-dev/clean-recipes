'use client';

import { LoginUseCase } from '@/@core/application/login/login.use-case';
import { RegisterUserUseCase } from '@/@core/application/user/register-user.use-case';
import { container, Registry } from '@/@core/infra/container-registry';
import { ILoginResult } from '@/Domain/Interfaces/ILoginResult';
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
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<ILoginResult>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_STORAGE_KEY = 'recipe_app_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Inicialização: Apenas lê o sessionStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSession) {
          const userData = JSON.parse(storedSession);
          setUser(userData);
        }
      }
    } catch (error) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<ILoginResult> => {
      try {
        setIsLoading(true);
        const LoginUseCase = container.get<LoginUseCase>(Registry.LoginUseCase);
        // Usar o use case de login
        const result = await LoginUseCase.execute(email, password);

        if (result.user) {
          setUser(result.user);
          sessionStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(result.user)
          );
        }

        return {
          success: result.success,
          message: result.message,
        };
      } catch (error) {
        console.error('Login error:', error);
        return {
          success: false,
          message: 'Erro durante o login. Tente novamente.',
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<ILoginResult> => {
      try {
        setIsLoading(true);
        const LoginUseCase = container.get<RegisterUserUseCase>(
          Registry.RegisterUserUseCase
        );
        const result = await LoginUseCase.execute({
          name: name,
          email: email,
          passwordHash: password,
        });

        if (result.user) {
          login(email, password);
        }

        return {
          success: result.success,
          message: result.message,
        };
      } catch (error) {
        console.error('Login error:', error);
        return {
          success: false,
          message: 'Erro durante o login. Tente novamente.',
        };
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );
  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        isLoading,
      }}
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
