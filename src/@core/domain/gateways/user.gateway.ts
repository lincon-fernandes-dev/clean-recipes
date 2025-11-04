import { ILoginResult } from '@/Domain/Interfaces/ILoginResult';
import { IUser } from '@/Domain/Interfaces/IUser';

export interface UserGateway {
  createUser(user: IUser): Promise<ILoginResult>;
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUser(user: IUser): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
