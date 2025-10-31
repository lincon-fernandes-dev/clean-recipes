import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';

export class DeleteRecipeUseCase {
  constructor(private recipeGateway: RecipeGateway) {}
  async execute(id: string): Promise<void> {
    return this.recipeGateway.delete(id);
  }
}
