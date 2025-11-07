import Badge from '@/components/templates/base/Badge/Tag/Badge';
import Button from '@/components/templates/base/Button/Button';
import Card from '@/components/templates/base/Card/Card';
import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import { Clock, Heart, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export interface IRecipeCardProps {
  recipe: IRecipe;
  onVote: (recipeId: string) => void;
  onComment: (recipeId: string) => void;
  onEdit: (recipeId: string) => void;
}

const RecipeCard: React.FC<IRecipeCardProps> = ({
  recipe,
  onVote,
  onComment,
}) => {
  const getDifficultyVariant = (difficulty: IRecipe['difficulty']) => {
    switch (difficulty) {
      case 'Fácil':
        return 'success';
      case 'Médio':
        return 'warning';
      case 'Difícil':
        return 'primary'; // Usando primary (vermelho) para difícil
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <Link href={`/recipes/${recipe.id}`} passHref>
        <div className="h-48 bg-gray-200 relative rounded-xl overflow-hidden mb-4">
          <div
            className="absolute inset-0 bg-cover bg-center "
            style={{ backgroundImage: `url(${recipe.imageUrl})` }}
          />

          <div className="absolute top-3 left-3 flex space-x-2">
            <Badge variant="info" icon={Clock}>
              {recipe.preparationTime} Min
            </Badge>
            <Badge variant="info" icon={Users}>
              {recipe.servings} Porções
            </Badge>
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col grow">
        <Link href={`/recipes/${recipe.id}`} passHref>
          <h3 className="text-xl font-bold text-accent truncate mb-1">
            {recipe.title}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-md text-primary">Dificuldade:</span>
          <Badge variant={getDifficultyVariant(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
          <Button
            variant="primary"
            size="small"
            icon={Heart}
            onClick={() => onVote(recipe.id!)}
            aria-label={`Votar na receita ${recipe.title}`}
          >
            {recipe.votes} Votos
          </Button>
          <Button
            variant="secondary"
            size="small"
            icon={MessageSquare}
            onClick={() => onComment(recipe.id!)}
            aria-label={`Ver comentários de ${recipe.title}`}
          >
            {recipe.comments?.length} Opiniões
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
