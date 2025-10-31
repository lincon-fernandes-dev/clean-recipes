// src/components/RecipeFeed/RecipeFeed.tsx
import { Recipe } from '@/@core/domain/entities/Recipe';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import * as React from 'react';

export interface IRecipeFeedProps {
  recipes: Recipe[];
  onRecipeAction: (type: 'vote' | 'comment' | 'edit', recipeId: string) => void;
  // Adicione props para filtros, ordenação, etc.
}

const RecipeFeed: React.FC<IRecipeFeedProps> = ({
  recipes,
  onRecipeAction,
}) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        Nenhuma receita encontrada. Seja o primeiro a adicionar uma!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onVote={(id) => onRecipeAction('vote', id)}
          onComment={(id) => onRecipeAction('comment', id)}
          onEdit={(id) => onRecipeAction('edit', id)}
        />
      ))}
    </div>
  );
};

export default RecipeFeed;
