// src/components/AuthGuard/AuthGuard.tsx
'use client';
// Seu componente Loading
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../templates/base/Loading/Loading';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redireciona APÓS O CARREGAMENTO
    if (!isLoading && !isAuthenticated) {
      // Usamos router.replace para navegação correta no cliente
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // 1. Durante o carregamento da sessão, mostra o Loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading message="Verificando sessão..." size="lg" />
      </div>
    );
  }

  // 2. Se não estiver autenticado (e não estiver carregando),
  // o useEffect já disparou o redirecionamento.
  if (!isAuthenticated) {
    return null; // Não renderiza nada enquanto espera o redirecionamento
  }

  // 3. Se autenticado, renderiza o conteúdo
  return <>{children}</>;
};

export default AuthGuard;
