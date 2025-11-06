import { CreateIngredientDTO } from './CreateIngredientDTO';
import { CreateInstructionDTO } from './CreateInstructionDTO';
import { CreateNutritionInfoDTO } from './CreateNutritionInfoDTO';

export interface CreateRecipeDTO {
  title: string;
  description: string;
  imageUrl: string;
  preparationTime: number;
  servings: number;
  difficulty: string;
  authorId: number;
  ingredients: CreateIngredientDTO[];
  instructions: CreateInstructionDTO[];
  tags: string[];
  nutritionInfo: CreateNutritionInfoDTO;
}
