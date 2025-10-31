import { IUser } from './IUser';

export interface IComment {
  id: string;
  recipeId: string;
  parentCommentId?: string;
  author: IUser;
  content: string;
  likes: number;
  replies?: IComment[];
  likedBy: Set<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
