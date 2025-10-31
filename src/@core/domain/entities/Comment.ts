import { IComment } from '@/Domain/Interfaces/IComment';
import { IUser } from '@/Domain/Interfaces/IUser';

export class Comment implements IComment {
  private _id: string;
  private _content: string;
  private _author: IUser;
  private _recipeId: string;
  private _parentCommentId?: string;
  private _likes: number;
  private _likedBy: Set<string>;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: IComment) {
    this.validate(props);

    this._id = props.id;
    this._content = props.content;
    this._author = props.author;
    this._recipeId = props.recipeId;
    this._parentCommentId = props.parentCommentId;
    this._likes = props.likes;
    this._likedBy = props.likedBy;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private validate(props: IComment): void {
    if (!props.id.trim()) {
      throw new Error('Comment ID is required');
    }

    if (!props.content.trim()) {
      throw new Error('Comment content is required');
    }

    if (props.content.length > 1000) {
      throw new Error('Comment content cannot exceed 1000 characters');
    }

    if (!props.recipeId.trim()) {
      throw new Error('Recipe ID is required');
    }

    if (props.likes < 0) {
      throw new Error('Likes cannot be negative');
    }
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get author(): IUser {
    return this._author;
  }

  get recipeId(): string {
    return this._recipeId;
  }

  get parentCommentId(): string | undefined {
    return this._parentCommentId;
  }

  get likes(): number {
    return this._likes;
  }

  get likedBy(): Set<string> {
    return new Set(this._likedBy);
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
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

  like(userId: string): void {
    if (this._likedBy.has(userId)) {
      throw new Error('User already liked this comment');
    }

    this._likedBy.add(userId);
    this._likes += 1;
    this._updatedAt = new Date();
  }

  unlike(userId: string): void {
    if (!this._likedBy.has(userId)) {
      throw new Error('User has not liked this comment');
    }

    this._likedBy.delete(userId);
    this._likes = Math.max(0, this._likes - 1);
    this._updatedAt = new Date();
  }

  hasLiked(userId: string): boolean {
    return this._likedBy.has(userId);
  }

  canEdit(userId: string): boolean {
    return this._author.id === userId;
  }

  canDelete(userId: string): boolean {
    return this._author.id === userId;
  }

  isReply(): boolean {
    return !!this._parentCommentId;
  }

  // Factory method
  static create(
    props: Omit<IComment, 'likes' | 'likedBy' | 'createdAt' | 'updatedAt'>
  ): Comment {
    return new Comment({
      ...props,
      likes: 0,
      likedBy: new Set(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Factory method for replies
  static createReply(
    props: Omit<
      IComment,
      'likes' | 'likedBy' | 'createdAt' | 'updatedAt' | 'parentCommentId'
    > & { parentCommentId: string }
  ): Comment {
    return new Comment({
      ...props,
      likes: 0,
      likedBy: new Set(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
