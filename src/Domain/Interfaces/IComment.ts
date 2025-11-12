import { IUser } from './IUser';

export interface IComment {
  idComment: number;
  idUser: number;
  idRecipe: number;
  parentCommentId?: number;
  parentComment?: IComment;
  author: IUser;
  content: string;
  likes: number;
  replies?: IComment[];
  isCommentLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
