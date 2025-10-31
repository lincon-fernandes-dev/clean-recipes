import { CreateRecipeUseCase } from '@/@core/application/recipe/create-recipe.use-case';
import { DeleteRecipeUseCase } from '@/@core/application/recipe/delete-recipe.use-case';
import { FindRecipeUseCase } from '@/@core/application/recipe/find-recipe.use-case';
import { ListRecipesUseCase } from '@/@core/application/recipe/list-recipes.use-case';
import { UpdateRecipeUseCase } from '@/@core/application/recipe/update-recipe.use-case';
import { Container } from 'inversify';
import { http } from './http';
import { RecipeHttpGateway } from './recipe-http.gateway';

export const Registry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  RecipeHttpGateway: Symbol.for('RecipeHttpGateway'),

  ListRecipesUseCase: Symbol.for('ListRecipesUseCase'),
  FindRecipeUseCase: Symbol.for('FindRecipeUseCase'),
  CreateRecipeUseCase: Symbol.for('CreateRecipeUseCase'),
  DeleteRecipeUseCase: Symbol.for('DeleteRecipeUseCase'),
  UpdateRecipeUseCase: Symbol.for('UpdateRecipeUseCase'),
};

export const container = new Container();

container.bind(Registry.AxiosAdapter).toConstantValue(http);

container.bind(Registry.RecipeHttpGateway).toDynamicValue((context) => {
  return new RecipeHttpGateway(context.get(Registry.AxiosAdapter));
});

container.bind(Registry.ListRecipesUseCase).toDynamicValue((context) => {
  return new ListRecipesUseCase(context.get(Registry.RecipeHttpGateway));
});
container.bind(Registry.FindRecipeUseCase).toDynamicValue((context) => {
  return new FindRecipeUseCase(context.get(Registry.RecipeHttpGateway));
});
container.bind(Registry.CreateRecipeUseCase).toDynamicValue((context) => {
  return new CreateRecipeUseCase(context.get(Registry.RecipeHttpGateway));
});
container.bind(Registry.DeleteRecipeUseCase).toDynamicValue((context) => {
  return new DeleteRecipeUseCase(context.get(Registry.RecipeHttpGateway));
});
container.bind(Registry.UpdateRecipeUseCase).toDynamicValue((context) => {
  return new UpdateRecipeUseCase(context.get(Registry.RecipeHttpGateway));
});
