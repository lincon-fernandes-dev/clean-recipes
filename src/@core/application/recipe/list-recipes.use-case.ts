import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';
import { IRecipe } from '@/Domain/Interfaces/IRecipe';

export class ListRecipesUseCase {
  constructor(private recipeGateway: RecipeGateway) {}
  async execute(): Promise<IRecipe[]> {
    return this.recipeGateway.findAll();
  }
}
