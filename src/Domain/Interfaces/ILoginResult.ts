import { IUser } from './IUser';

export interface ILoginResult {
  success: boolean;
  message: string;
  user?: IUser;
}
