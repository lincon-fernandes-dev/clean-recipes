export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
