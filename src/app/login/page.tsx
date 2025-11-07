'use client';

import LoginForm from '@/components/LoginForm/LoginForm';
import Card from '@/components/templates/base/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { ChefHat, Sparkles } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação com delay para evitar flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Se já estiver autenticado, redireciona para a Home
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isAuthenticated && !isLoading) {
    redirect('/');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <ChefHat className="w-12 h-12 text-primary animate-pulse" />
            <Sparkles className="w-6 h-6 text-accent absolute -top-2 -right-2 animate-bounce" />
          </div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5 p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="w-full max-w-md relative z-10">
        {/* Header decorativo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta</h1>
          <p className="text-muted-foreground">
            Entre na sua conta e continue sua jornada culinária
          </p>
        </div>

        {/* Card do formulário */}
        <Card
          shadow="xl"
          padding="lg"
          className="p-8 bg-card/80 backdrop-blur-sm border border-border/50 relative overflow-hidden"
        >
          {/* Efeito de brilho no card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-accent"></div>

          <LoginForm onLoginSucess={redirect('/')} />

          {/* Rodapé decorativo */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              Junte-se a milhares de amantes da culinária
            </p>
            <div className="flex justify-center space-x-4 mt-3 text-xs text-muted-foreground">
              <span>🍳 1.2K+ Receitas</span>
              <span>👨‍🍳 500+ Chefs</span>
              <span>⭐ 4.8 Avaliação</span>
            </div>
          </div>
        </Card>

        {/* Link de suporte */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/help')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Precisa de ajuda?{' '}
            <span className="text-primary font-medium">Fale conosco</span>
          </button>
        </div>
      </div>
    </div>
  );
}
