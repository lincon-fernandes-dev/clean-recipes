import { Recipe } from '@/@core/domain/entities/Recipe';
import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';
import { IApiResponse } from '@/Domain/Interfaces/IApiResponse';
import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import { AxiosInstance } from 'axios';

export class RecipeHttpGateway implements RecipeGateway {
  constructor(private http: AxiosInstance) {}

  async create(recipe: Recipe): Promise<void> {
    await this.http.post('/recipes', recipe);
  }
  async findById(id: string): Promise<Recipe | null> {
    const response = await this.http.get<Recipe>(`/recipes/${id}`);
    return response.data || null;
  }
  async findAll(): Promise<Recipe[]> {
    const response = await this.http.get<IApiResponse<IRecipe[]>>('/recipes');

    if (!response.data?.data) {
      return [];
    }

    return response.data.data.map((recipeData) => new Recipe(recipeData));
  }
  async update(recipe: Recipe): Promise<void> {
    await this.http.put(`/recipes/${recipe.id}`, recipe);
  }
  async delete(id: string): Promise<void> {
    await this.http.delete(`/recipes/${id}`);
  }
}
