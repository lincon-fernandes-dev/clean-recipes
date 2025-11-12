import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import * as React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';

export interface IRecipeFeedProps {
  recipes: IRecipe[];
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
          key={recipe.idRecipe}
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
