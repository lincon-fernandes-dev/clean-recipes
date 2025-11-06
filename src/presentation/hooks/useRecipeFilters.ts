// src/presentation/hooks/useRecipeFilters.ts
import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import { useMemo, useState } from 'react';

interface UseRecipeFiltersProps {
  recipes: IRecipe[] | undefined;
}

export const useRecipeFilters = ({ recipes }: UseRecipeFiltersProps) => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredRecipes = useMemo(() => {
    if (!recipes || recipes.length === 0) {
      return [];
    }

    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.tags?.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      switch (selectedFilter) {
        case 'easy':
          return recipe.difficulty === 'Fácil';
        case 'dessert':
          return (
            recipe.tags?.includes('Sobremesa') || recipe.tags?.includes('Doce')
          );
        default:
          return matchesSearch;
      }
    });
  }, [recipes, search, selectedFilter]);

  return {
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    filteredRecipes,
  };
};
