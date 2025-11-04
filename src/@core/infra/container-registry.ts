import { CreateRecipeUseCase } from '@/@core/application/recipe/create-recipe.use-case';
import { DeleteRecipeUseCase } from '@/@core/application/recipe/delete-recipe.use-case';
import { FindRecipeUseCase } from '@/@core/application/recipe/find-recipe.use-case';
import { ListRecipesUseCase } from '@/@core/application/recipe/list-recipes.use-case';
import { UpdateRecipeUseCase } from '@/@core/application/recipe/update-recipe.use-case';
import { Container } from 'inversify';
import { LoginUseCase } from '../application/login/login.use-case';
import { FindUserByEmailUseCase } from '../application/user/find-user-byEmail.use-case';
import { RegisterUserUseCase } from '../application/user/register-user.use-case';
import { RecipeHttpGateway } from './gateways/recipe-http.gateway';
import { UserLocalGateway } from './gateways/user-local.gateway';
import { http } from './http';

export const Registry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  RecipeHttpGateway: Symbol.for('RecipeHttpGateway'),
  UserLocalGateway: Symbol.for('UserLocalGateway'),

  ListRecipesUseCase: Symbol.for('ListRecipesUseCase'),
  FindRecipeUseCase: Symbol.for('FindRecipeUseCase'),
  CreateRecipeUseCase: Symbol.for('CreateRecipeUseCase'),
  DeleteRecipeUseCase: Symbol.for('DeleteRecipeUseCase'),
  UpdateRecipeUseCase: Symbol.for('UpdateRecipeUseCase'),

  LoginUseCase: Symbol.for('LoginUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  FindUserByEmailUseCase: Symbol.for('FindUserByEmailUseCase'),
};

export const container = new Container();

container.bind(Registry.AxiosAdapter).toConstantValue(http);

container.bind(Registry.RecipeHttpGateway).toDynamicValue((context) => {
  return new RecipeHttpGateway(context.get(Registry.AxiosAdapter));
});
// eslint-disable-next-line
container.bind(Registry.UserLocalGateway).toDynamicValue((context) => {
  return new UserLocalGateway();
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

container.bind(Registry.FindUserByEmailUseCase).toDynamicValue((context) => {
  return new FindUserByEmailUseCase(context.get(Registry.UserLocalGateway));
});
container.bind(Registry.LoginUseCase).toDynamicValue((context) => {
  return new LoginUseCase(context.get(Registry.UserLocalGateway));
});
container.bind(Registry.RegisterUserUseCase).toDynamicValue((context) => {
  return new RegisterUserUseCase(context.get(Registry.UserLocalGateway));
});
