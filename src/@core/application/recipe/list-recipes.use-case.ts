import { Recipe } from '@/@core/domain/entities/Recipe';
import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';

export class ListRecipesUseCase {
  constructor(private recipeGateway: RecipeGateway) {}
  async execute(): Promise<Recipe[]> {
    return this.recipeGateway.findAll();
  }
}
