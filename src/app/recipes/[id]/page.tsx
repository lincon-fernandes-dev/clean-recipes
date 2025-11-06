'use client';

import Button from '@/components/templates/base/Button/Button';
import { ErrorState } from '@/components/templates/base/ErrorState/ErrorState';
import Loading from '@/components/templates/base/Loading/Loading';
import { useRecipes } from '@/presentation/hooks/useRecipes';
import {
  ArrowLeft,
  Bookmark,
  ChefHat,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Star,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const RecipeDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;
  const [isSaved, setIsSaved] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(0);

  const { useFindRecipe } = useRecipes();
  const { data: recipe, isLoading, error } = useFindRecipe(recipeId);

  if (isLoading) {
    return <Loading message="Carregando receitas..." />;
  }

  if (error) {
    return <ErrorState title="Erro ao carregar receitas" error={error} />;
  }

  const handleVote = () => {
    if (hasVoted) {
      setVotes(votes - 1);
      setHasVoted(false);
    } else {
      setVotes(votes + 1);
      setHasVoted(true);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // Aqui você pode adicionar um toast de feedback
    console.log('Link copiado!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header com navegação */}
      <header className="sticky top-0 bg-card/80 backdrop-blur-sm border-b border-border z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="small"
                icon={Share2}
                onClick={handleShare}
              >
                Compartilhar
              </Button>
              <button
                onClick={handleSave}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isSaved
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border text-foreground hover:bg-primary hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Imagem da Receita */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted/20">
              <div className="relative w-full h-full flex items-center justify-center text-muted-foreground">
                <Image src={`${recipe!.imageUrl}`} fill alt={recipe!.title} />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {recipe!.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Informações da Receita */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {recipe!.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {recipe!.description}
              </p>
            </div>

            {/* Metadados */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">{recipe!.preparationTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">{recipe!.servings} porções</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <ChefHat className="w-5 h-5 text-primary" />
                <span className="font-medium">{recipe!.difficulty}</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">{recipe!.rating}/5</span>
              </div>
            </div>

            {/* Ações e Estatísticas */}
            <div className="flex items-center space-x-6 pt-4 border-t border-border">
              <button
                onClick={handleVote}
                className={`flex items-center space-x-2 transition-colors duration-200 ${
                  hasVoted
                    ? 'text-red-500'
                    : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${hasVoted ? 'fill-current' : ''}`}
                />
                <span className="font-medium">{votes}</span>
              </button>

              <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{recipe!.commentCount}</span>
              </button>

              {/* Autor */}
              {recipe!.author && (
                <div className="flex items-center space-x-2 ml-auto">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium text-sm">
                      {recipe!.author.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Por {recipe!.author.name}
                  </span>
                </div>
              )}
            </div>

            {/* Informações Nutricionais */}
            {recipe!.nutrition && (
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-3">
                  Informação Nutricional (por porção)
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Calorias</span>
                    <p className="font-medium text-foreground">
                      {recipe!.nutrition.calories} kcal
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Proteínas</span>
                    <p className="font-medium text-foreground">
                      {recipe!.nutrition.proteins}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Carboidratos</span>
                    <p className="font-medium text-foreground">
                      {recipe!.nutrition.carbs}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gorduras</span>
                    <p className="font-medium text-foreground">
                      {recipe!.nutrition.fat}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredientes */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Ingredientes
              </h2>
              <ul className="space-y-3">
                {recipe!.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <span className="text-foreground leading-relaxed">
                      {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modo de Preparo */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Modo de Preparo
              </h2>
              <ol className="space-y-4">
                {recipe!.instructions?.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-foreground leading-relaxed pt-1">
                      {instruction.content}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
