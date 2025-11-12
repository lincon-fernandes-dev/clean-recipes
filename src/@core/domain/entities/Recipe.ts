// src/Domain/Entities/Recipe.ts
import { IIngredient } from '@/Domain/Interfaces/IIngredient';
import { IInstruction } from '@/Domain/Interfaces/IInstruction';
import { INutritionInfo } from '@/Domain/Interfaces/INutritionInfo';
import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import { IUser } from '@/Domain/Interfaces/IUser';
import { DifficultyType } from '@/Domain/types/DifficultyType';
import { Comment } from './Comment';

export class Recipe implements IRecipe {
  private _idRecipe?: string;
  private _title: string;
  private _description: string;
  private _imageUrl: string;
  private _preparationTime: number;
  private _servings: number;
  private _difficulty: DifficultyType;
  private _ingredients: IIngredient[];
  private _instructions: IInstruction[];
  private _tags?: string[];
  private _author: IUser;
  private _nutritionInfo?: INutritionInfo;
  private _votes?: number;
  private _votedBy?: Set<string>;
  private _comments: Comment[] = [];
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: IRecipe) {
    this.validate(props);

    this._idRecipe = props.idRecipe;
    this._title = props.title;
    this._description = props.description;
    this._imageUrl = props.imageUrl;
    this._preparationTime = props.preparationTime;
    this._servings = props.servings;
    this._difficulty = props.difficulty;
    this._ingredients = props.ingredients;
    this._instructions = props.instructions;
    this._tags = props.tags || [];
    this._author = props.author;
    this._nutritionInfo = props.nutritionInfo;
    this._votes = props.votes;
    this._votedBy = props.votedBy;

    this._comments = props.comments?.map((c) => new Comment(c)) || [];

    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private validate(props: IRecipe): void {
    if (!props.title.trim()) {
      throw new Error('Recipe title is required');
    }

    if (props.title.length > 100) {
      throw new Error('Recipe title cannot exceed 100 characters');
    }

    if (!props.description?.trim()) {
      throw new Error('Recipe description is required');
    }

    if (props.preparationTime <= 0) {
      throw new Error('Preparation time must be positive');
    }

    if (props.servings <= 0) {
      throw new Error('Servings must be positive');
    }

    if (props.ingredients.length === 0) {
      throw new Error('Recipe must have at least one ingredient');
    }

    if (props.instructions.length === 0) {
      throw new Error('Recipe must have at least one instruction');
    }
  }

  // Getters
  get idRecipe(): string | undefined {
    return this._idRecipe;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get preparationTime(): number {
    return this._preparationTime;
  }

  get servings(): number {
    return this._servings;
  }

  get difficulty(): DifficultyType {
    return this._difficulty;
  }

  get ingredients(): IIngredient[] {
    return [...this._ingredients];
  }

  get instructions(): IInstruction[] {
    return [...this._instructions];
  }

  get tags(): string[] {
    return this._tags || [];
  }

  get author(): IUser {
    return this._author;
  }

  get nutritionInfo(): INutritionInfo | undefined {
    return this._nutritionInfo;
  }

  get votes(): number | undefined {
    return this._votes;
  }

  get votedBy(): Set<string> {
    return new Set(this._votedBy);
  }

  get comments(): Comment[] {
    return [...this._comments];
  }

  get commentCount(): number {
    return this._comments.length;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  get rating(): number {
    const totalVotes = this.votes;
    if (totalVotes === 0) return 0;

    const baseRating = 4.5 + Math.random() * 0.5;
    return Math.round(baseRating * 10) / 10;
  }

  get formattedTime(): string {
    const hours = Math.floor(this.preparationTime / 60);
    const minutes = this.preparationTime % 60;

    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim();
    }
    return `${minutes}m`;
  }

  updateTitle(title: string): void {
    if (!title.trim()) {
      throw new Error('Recipe title cannot be empty');
    }

    if (title.length > 100) {
      throw new Error('Recipe title cannot exceed 100 characters');
    }

    this._title = title;
    this._updatedAt = new Date();
  }

  updateDescription(description: string): void {
    if (!description.trim()) {
      throw new Error('Recipe description cannot be empty');
    }

    this._description = description;
    this._updatedAt = new Date();
  }

  hasVoted(userId: string): boolean {
    console.log(userId);
    return true;
  }

  addTag(tag: string): void {
    if (!tag.trim()) {
      throw new Error('Tag cannot be empty');
    }

    if (!this._tags) {
      this._tags = [];
    }

    if (!this._tags.includes(tag)) {
      this._tags.push(tag);
      this._updatedAt = new Date();
    }
  }

  removeTag(tag: string): void {
    const tagIndex = this._tags!.indexOf(tag);
    if (tagIndex > -1) {
      this._tags!.splice(tagIndex, 1);
      this._updatedAt = new Date();
    }
  }

  // Factory method
  static create(
    props: Omit<
      IRecipe,
      'id' | 'votes' | 'votedBy' | 'comments' | 'createdAt' | 'updatedAt'
    >
  ): Recipe {
    return new Recipe({
      ...props,
      votes: 0,
      votedBy: new Set(),
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
