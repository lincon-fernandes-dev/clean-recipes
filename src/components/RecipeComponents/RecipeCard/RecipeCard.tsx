import { Recipe } from '@/@core/domain/entities/Recipe';
import Badge from '@/components/templates/base/Badge/Tag/Badge';
import Button from '@/components/templates/base/Button/Button';
import Card from '@/components/templates/base/Card/Card';
import { Clock, Edit, Heart, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

// Atualize a interface IRecipe para incluir os novos campos:
export interface IRecipe {
  id: string;
  title: string;
  imageUrl: string;
  time: string;
  servings: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  votes: number;
  commentCount: number;
  hasVoted: boolean;
  canEdit: boolean;
  user?: {
    name: string;
    avatar: string;
  };
  tags?: string[];
  rating?: number;
}

export interface IRecipeCardProps {
  recipe: Recipe;
  onVote: (recipeId: string) => void;
  onComment: (recipeId: string) => void;
  onEdit: (recipeId: string) => void;
}

const RecipeCard: React.FC<IRecipeCardProps> = ({
  recipe,
  onVote,
  onComment,
  onEdit,
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
    <Link href={`/recipes/${recipe.id}`} passHref>
      <Card isClickable className="flex flex-col overflow-hidden h-full">
        <div className="h-48 bg-gray-200 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
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
        <div className="p-4 flex flex-col grow">
          <h3 className="text-xl font-bold text-gray-900 truncate mb-1">
            {recipe.title}
          </h3>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-gray-500">Dificuldade:</span>
            <Badge variant={getDifficultyVariant(recipe.difficulty)}>
              {recipe.difficulty}
            </Badge>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
            <Button
              variant={recipe.hasVoted('u2') ? 'danger' : 'secondary'}
              size="small"
              icon={Heart}
              onClick={() => onVote(recipe.id)}
              aria-label={`Votar na receita ${recipe.title}`}
            >
              {recipe.votes} Votos
            </Button>
            <Button
              variant="ghost"
              size="small"
              icon={MessageSquare}
              onClick={() => onComment(recipe.id)}
              aria-label={`Ver comentários de ${recipe.title}`}
            >
              {recipe.commentCount} Opiniões
            </Button>
            {recipe.canEdit('u1') && (
              <Button
                variant="secondary"
                size="small"
                icon={Edit}
                onClick={() => onEdit(recipe.id)}
                aria-label={`Propor alteração em ${recipe.title}`}
              >
                Alterar
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RecipeCard;
