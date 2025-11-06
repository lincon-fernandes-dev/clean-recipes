import { Recipe } from '@/@core/domain/entities/Recipe';
import { RecipeGateway } from '@/@core/domain/gateways/recipe.gateway';
import { CreateRecipeDTO } from '@/Domain/DTOs/CreateRecipeDTO';
import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import { AxiosInstance } from 'axios';

export class RecipeHttpGateway implements RecipeGateway {
  constructor(private http: AxiosInstance) {}

  async create(recipe: CreateRecipeDTO): Promise<void> {
    await this.http.post('/recipes', recipe);
  }
  async findById(id: string): Promise<Recipe | null> {
    const response = await this.http.get<IRecipe>(`/recipes/${id}`);
    if (!response.data) {
      return null;
    }

    return new Recipe(response.data);
  }
  async findAll(): Promise<Recipe[]> {
    const response = await this.http.get<IRecipe[]>('/recipes');

    if (!response.data) {
      return [];
    }

    return response.data.map((recipeData) => new Recipe(recipeData));
  }
  async update(recipe: Recipe): Promise<void> {
    await this.http.put(`/recipes/${recipe.id}`, recipe);
  }
  async delete(id: string): Promise<void> {
    await this.http.delete(`/recipes/${id}`);
  }
}
