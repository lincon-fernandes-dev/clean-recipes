'use client';

import FilterSection from '@/components/RecipeComponents/Filter/Filter';
import { HeroSection } from '@/components/RecipeComponents/HeroSection/HeroSection';
import RecipeFeed from '@/components/RecipeComponents/RecipeFeed/RecipeFeed';
import { RecipeResultsHeader } from '@/components/RecipeComponents/RecipeResultsHeader/RecipeResultsHeader';
import { RecipesEmptyState } from '@/components/RecipeComponents/RecipesEmptyState/RecipesEmptyState';
import { ErrorState } from '@/components/templates/base/ErrorState/ErrorState';
import Loading from '@/components/templates/base/Loading/Loading';
import { useRecipeFilters } from '@/presentation/hooks/useRecipeFilters';
import { useRecipes } from '@/presentation/hooks/useRecipes';

const HomePageContent: React.FC = () => {
  const { useListRecipes } = useRecipes();
  const { data: recipes, isLoading, error } = useListRecipes();

  const {
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    filteredRecipes,
  } = useRecipeFilters({ recipes });

  const handleRecipeAction = (
    type: 'vote' | 'comment' | 'edit',
    recipeId: string
  ) => {
    console.log(`Ação: ${type} na receita ID: ${recipeId}`);
  };

  if (isLoading) {
    return <Loading message="Carregando receitas..." />;
  }

  if (error) {
    return <ErrorState title="Erro ao carregar receitas" error={error} />;
  }

  const showEmptyState = filteredRecipes.length === 0;
  const hasRecipes = recipes && recipes.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Descubra & Compartilhe"
        highlightText="Receitas Incríveis"
        subtitle="Junte-se à nossa comunidade de amantes da culinária. Explore milhares de receitas, compartilhe suas criações e inspire-se todos os dias."
      />

      <main className="container mx-auto px-6 py-8">
        <FilterSection
          search={search}
          onSearchChange={setSearch}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <RecipeResultsHeader
          selectedFilter={selectedFilter}
          resultCount={filteredRecipes.length}
          searchQuery={search}
        />

        <RecipeFeed
          recipes={filteredRecipes}
          onRecipeAction={handleRecipeAction}
        />

        {showEmptyState && hasRecipes && (
          <RecipesEmptyState type="no-results" />
        )}

        {showEmptyState && !hasRecipes && (
          <RecipesEmptyState type="no-recipes" />
        )}
      </main>
    </div>
  );
};

export default HomePageContent;
