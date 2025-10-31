// src/app/recipes/new/page.tsx
'use client';

import { Recipe } from '@/@core/domain/entities/Recipe';
import AuthGuard from '@/components/AuthGuard/AuthGuard';
import {
  CreateRecipeData,
  RecipeForm,
} from '@/components/RecipeComponents/CreateRecipeForm/CreateRecipeForm';
import { useAuth } from '@/context/AuthContext';
import { useRecipes } from '@/presentation/hooks/useRecipes';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewRecipePage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { useCreateRecipe } = useRecipes();
  const createRecipeMutation = useCreateRecipe();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (recipeData: CreateRecipeData) => {
    if (!user) {
      alert('Você precisa estar logado para criar uma receita');
      return;
    }

    setIsSubmitting(true);

    try {
      // Criar a entidade Recipe
      const newRecipe = Recipe.create({
        ...recipeData,
        id: `r-${Date.now()}`,
        author: {
          id: user.id || 'current-user',
          name: user.name || user.email || 'Usuário',
          email: user.email || '',
          avatar: user.avatar,
        },
      });

      // Executar a mutation
      await createRecipeMutation.mutateAsync(newRecipe);

      // Redirecionar para a home ou para a receita criada
      router.push('/');
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      alert('Erro ao criar receita. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Acesso Negado
          </h1>
          <p className="text-muted-foreground">
            Você precisa estar logado para criar uma receita.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">
                Criar Nova Receita
              </h1>
              <p className="text-muted-foreground text-sm">
                Compartilhe sua receita com a comunidade
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <RecipeForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSubmitting || createRecipeMutation.isPending}
            currentUser={{
              id: user.id || 'current-user',
              name: user.name || user.email || 'Usuário',
              email: user.email || '',
              avatar: user.avatar,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default function NewRecipe() {
  return (
    <AuthGuard>
      <NewRecipePage />
    </AuthGuard>
  );
}
