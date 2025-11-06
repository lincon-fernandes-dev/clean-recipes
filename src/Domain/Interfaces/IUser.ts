export interface IUser {
  id?: number;
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
