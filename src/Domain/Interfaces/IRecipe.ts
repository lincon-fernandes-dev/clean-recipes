import { DifficultyType } from '../types/DifficultyType';
import { IComment } from './IComment';
import { IIngredient } from './IIngredient';
import { IInstruction } from './IInstruction';
import { INutritionInfo } from './INutritionInfo';
import { IUser } from './IUser';

export interface IRecipe {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  preparationTime: number;
  servings: number;
  difficulty: DifficultyType;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  tags?: string[];
  author: IUser;
  nutrition?: INutritionInfo;
  votes?: number;
  votedBy?: Set<string>;
  comments?: IComment[];
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
