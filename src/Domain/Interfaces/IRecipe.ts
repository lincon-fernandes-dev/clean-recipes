import { DifficultyType } from '../types/DifficultyType';
import { IComment } from './IComment';
import { INutritionInfo } from './INutritionInfo';
import { IUser } from './IUser';

export interface IRecipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  preparationTime: number;
  servings: number;
  difficulty: DifficultyType;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  author: IUser;
  nutrition?: INutritionInfo;
  votes: number;
  votedBy: Set<string>;
  comments?: IComment[];
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
