import { IComment } from '@/Domain/Interfaces/IComment';
import { IUser } from '@/Domain/Interfaces/IUser';

export class Comment implements IComment {
  private _id: number;
  private _idUser: number;
  private _idRecipe: number;
  private _parentCommentId?: number;
  private _content: string;
  private _author: IUser;
  private _likes: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _replies: Comment[];
  private _isCommentLiked: boolean;

  constructor(props: IComment) {
    this.validate(props);

    this._id = props.idComment;
    this._idUser = props.idUser;
    this._author = props.author;
    this._idRecipe = props.idRecipe;
    this._parentCommentId = props.parentCommentId;
    this._content = props.content;
    this._replies = props.replies?.map((r) => new Comment(r)) || [];
    this._likes = props.likes ?? 0;
    this._isCommentLiked = props.isCommentLiked ?? false;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private validate(props: IComment): void {
    if (!props.content?.trim()) {
      throw new Error('Comment content cannot be empty');
    }

    if (props.content.length > 1000) {
      throw new Error('Comment content cannot exceed 1000 characters');
    }

    if (!props.author) {
      throw new Error('Comment must have an author');
    }
  }

  get idComment(): number {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get idUser(): number {
    return this._idUser;
  }

  get idRecipe(): number {
    return this._idRecipe;
  }

  get isCommentLiked(): boolean {
    return this._isCommentLiked;
  }

  get author(): IUser {
    return this._author;
  }

  get recipeId(): number {
    return this._idRecipe;
  }

  get parentCommentId(): number | undefined {
    return this._parentCommentId;
  }

  get likes(): number {
    return this._likes;
  }

  get replies(): Comment[] {
    return this._replies;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Business methods
  updateContent(content: string): void {
    if (!content.trim()) {
      throw new Error('Comment content cannot be empty');
    }

    if (content.length > 1000) {
      throw new Error('Comment content cannot exceed 1000 characters');
    }

    this._content = content;
    this._updatedAt = new Date();
  }

  like(): void {
    this._likes += 1;
    this._isCommentLiked = true;
    this._updatedAt = new Date();
  }

  unlike(): void {
    this._likes = Math.max(0, this._likes - 1);
    this._isCommentLiked = false;
    this._updatedAt = new Date();
  }

  addReply(reply: Comment): void {
    if (reply.parentCommentId !== this.idComment) {
      throw new Error('Reply must reference this comment as parent');
    }
    this._replies.push(reply);
  }

  canEdit(userId: number): boolean {
    return this._author.id === userId;
  }

  canDelete(userId: number): boolean {
    return this._author.id === userId;
  }

  isReply(): boolean {
    return !!this._parentCommentId;
  }

  hasReplies(): boolean {
    return this._replies.length > 0;
  }
}
