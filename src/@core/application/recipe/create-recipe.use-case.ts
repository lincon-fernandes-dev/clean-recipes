import { Recipe } from '@/@core/domain/entities/Recipe';
import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';

export class CreateRecipeUseCase {
  constructor(private recipeGateway: RecipeGateway) {}
  async execute(recipe: Recipe): Promise<void> {
    return this.recipeGateway.create(recipe);
  }
}
