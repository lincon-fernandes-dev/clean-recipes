'use client';

import { Recipe } from '@/@core/domain/entities/Recipe';
import AuthGuard from '@/components/AuthGuard/AuthGuard';
import FilterSection from '@/components/Filter/Filter';
import RecipeFeed from '@/components/RecipeFeed/RecipeFeed';
import StatsCard from '@/components/StatusCard/StatusCard';
import { useRecipes } from '@/presentation/hooks/useRecipes';
import { Clock, Search, Star, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const HomePageContent: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { useListRecipes } = useRecipes();
  const { data: recipes, isLoading, error } = useListRecipes();

  useEffect(() => {
    if (error) {
      console.error('Error loading recipes:', error);
    }
    if (recipes != null && recipes.length >= 0) {
      setFilteredRecipes(
        recipes.filter((recipe) => {
          const matchesSearch =
            recipe.title.toLowerCase().includes(search.toLowerCase()) ||
            recipe.tags?.some((tag) =>
              tag.toLowerCase().includes(search.toLowerCase())
            );

          switch (selectedFilter) {
            case 'popular':
              return recipe.votes > 100;
            case 'easy':
              return recipe.difficulty === 'Fácil';
            case 'dessert':
              return (
                recipe.tags?.includes('Sobremesa') ||
                recipe.tags?.includes('Doce')
              );
            default:
              return matchesSearch;
          }
        })
      );
    }
  }, [error, filteredRecipes, search, selectedFilter]);
  const handleRecipeAction = (
    type: 'vote' | 'comment' | 'edit',
    recipeId: string
  ) => {
    console.log(`Ação: ${type} na receita ID: ${recipeId}`);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando receitas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">Erro ao carregar receitas</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-linear-to-br from-primary/10 via-background to-secondary/5 border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Descobre & Compartilha
              <span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Receitas Incríveis
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Junte-se à nossa comunidade de amantes da culinária. Explore
              milhares de receitas, compartilhe suas criações e inspire-se todos
              os dias.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            <StatsCard
              icon={<Users className="w-5 h-5" />}
              label="Receitas"
              value="1.2K+"
            />
            <StatsCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Ativas Hoje"
              value="47"
            />
            <StatsCard
              icon={<Clock className="w-5 h-5" />}
              label="Tempo Médio"
              value="35m"
            />
            <StatsCard
              icon={<Star className="w-5 h-5" />}
              label="Avaliação"
              value="4.8"
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-8">
        <FilterSection
          search={search}
          onSearchChange={setSearch}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {selectedFilter === 'all'
                ? 'Receitas em Destaque'
                : selectedFilter === 'popular'
                  ? 'Receitas Populares'
                  : selectedFilter === 'recent'
                    ? 'Receitas Recentes'
                    : selectedFilter === 'easy'
                      ? 'Receitas Fáceis'
                      : 'Sobremesas'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {filteredRecipes.length} receitas encontradas
            </p>
          </div>

          {search && (
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
              Buscando por: &quot;{search}&quot;
            </div>
          )}
        </div>

        <RecipeFeed
          recipes={filteredRecipes}
          onRecipeAction={handleRecipeAction}
        />

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma receita encontrada
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar sua busca ou filtro para ver mais receitas.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default function Home() {
  return (
    <AuthGuard>
      <HomePageContent />
    </AuthGuard>
  );
}
