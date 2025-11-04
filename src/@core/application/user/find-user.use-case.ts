import { Recipe } from '@/@core/domain/entities/Recipe';
import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';

export class FindRecipeUseCase {
  constructor(private recipeGateway: RecipeGateway) {}
  async execute(id: string): Promise<Recipe | null> {
    return this.recipeGateway.findById(id);
  }
}
