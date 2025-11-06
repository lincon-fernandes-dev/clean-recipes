import { CreateRecipeDTO } from '@/Domain/DTOs/CreateRecipeDTO';
import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import { Recipe } from '../entities/Recipe';

export interface RecipeGateway {
  create(recipe: CreateRecipeDTO): Promise<void>;
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<IRecipe[]>;
  update(recipe: Recipe): Promise<void>;
  delete(id: string): Promise<void>;
}
