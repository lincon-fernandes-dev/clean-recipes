// src/domain/entities/User.ts

import { IUser } from '@/Domain/Interfaces/IUser';

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _avatar?: string;
  private _isVerified: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: IUser) {
    this.validate(props);

    this._id = props.id;
    this._name = props.name;
    this._email = props.email;
    this._avatar = props.avatar;
    this._isVerified = props.isVerified || false;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  private validate(props: IUser): void {
    if (!props.id.trim()) {
      throw new Error('User ID is required');
    }

    if (!props.name.trim()) {
      throw new Error('User name is required');
    }

    // if (!props.email.trim() || !this.isValidEmail(props.email)) {
    //   throw new Error('Valid email is required');
    // }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get avatar(): string | undefined {
    return this._avatar;
  }

  get isVerified(): boolean {
    return this._isVerified || false;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Setters com validação
  set name(name: string) {
    if (!name.trim()) {
      throw new Error('User name cannot be empty');
    }
    this._name = name;
    this._updatedAt = new Date();
  }

  set email(email: string) {
    if (!email.trim() || !this.isValidEmail(email)) {
      throw new Error('Valid email is required');
    }
    this._email = email;
    this._updatedAt = new Date();
  }

  set avatar(avatar: string | undefined) {
    this._avatar = avatar;
    this._updatedAt = new Date();
  }

  // Business methods
  verify(): void {
    this._isVerified = true;
    this._updatedAt = new Date();
  }

  updateProfile(profile: { name?: string; avatar?: string }): void {
    if (profile.name !== undefined) {
      this.name = profile.name;
    }
    if (profile.avatar !== undefined) {
      this.avatar = profile.avatar;
    }
  }

  // Factory method
  static create(props: Omit<IUser, 'createdAt' | 'updatedAt'>): User {
    return new User({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
