// src/presentation/hooks/useRecipes.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CreateRecipeUseCase } from '@/@core/application/recipe/create-recipe.use-case';
import { DeleteRecipeUseCase } from '@/@core/application/recipe/delete-recipe.use-case';
import { FindRecipeUseCase } from '@/@core/application/recipe/find-recipe.use-case';
import { ListRecipesUseCase } from '@/@core/application/recipe/list-recipes.use-case';
import { UpdateRecipeUseCase } from '@/@core/application/recipe/update-recipe.use-case';
import { Recipe } from '@/@core/domain/entities/Recipe';
import { container, Registry } from '@/@core/infra/container-registry';

export const useRecipes = () => {
  const queryClient = useQueryClient();

  const listRecipesUseCase = container.get<ListRecipesUseCase>(
    Registry.ListRecipesUseCase
  );
  const findRecipeUseCase = container.get<FindRecipeUseCase>(
    Registry.FindRecipeUseCase
  );
  const createRecipeUseCase = container.get<CreateRecipeUseCase>(
    Registry.CreateRecipeUseCase
  );
  const updateRecipeUseCase = container.get<UpdateRecipeUseCase>(
    Registry.UpdateRecipeUseCase
  );
  const deleteRecipeUseCase = container.get<DeleteRecipeUseCase>(
    Registry.DeleteRecipeUseCase
  );

  const useListRecipes = () => {
    return useQuery({
      queryKey: ['recipes'],
      queryFn: async () => {
        const result = await listRecipesUseCase.execute();
        return result;
      },
    });
  };

  const useFindRecipe = (id: string) => {
    return useQuery({
      queryKey: ['recipe', id],
      queryFn: () => findRecipeUseCase.execute(id),
      enabled: !!id,
    });
  };

  // Mutation para criar uma receita
  const useCreateRecipe = () => {
    return useMutation({
      mutationFn: (recipe: Recipe) => createRecipeUseCase.execute(recipe),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['recipes'] });
      },
    });
  };

  // Mutation para atualizar uma receita
  const useUpdateRecipe = () => {
    return useMutation({
      mutationFn: (recipe: Recipe) => updateRecipeUseCase.execute(recipe),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['recipes'] });
        queryClient.invalidateQueries({ queryKey: ['recipe', variables.id] });
      },
    });
  };

  // Mutation para deletar uma receita
  const useDeleteRecipe = () => {
    return useMutation({
      mutationFn: (id: string) => deleteRecipeUseCase.execute(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['recipes'] });
      },
    });
  };

  return {
    useListRecipes,
    useFindRecipe,
    useCreateRecipe,
    useUpdateRecipe,
    useDeleteRecipe,
  };
};
