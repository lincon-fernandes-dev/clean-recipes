import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';
import { CreateRecipeDTO } from '@/Domain/DTOs/CreateRecipeDTO';

export class CreateRecipeUseCase {
  constructor(private recipeGateway: RecipeGateway) {}
  async execute(recipe: CreateRecipeDTO): Promise<void> {
    return this.recipeGateway.create(recipe);
  }
}
