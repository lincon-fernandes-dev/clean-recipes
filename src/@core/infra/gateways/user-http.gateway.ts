import { UserGateway } from '@/@core/domain/gateways/user.gateway';
import { ILoginResult } from '@/Domain/Interfaces/ILoginResult';
import { IUser } from '@/Domain/Interfaces/IUser';
import { AxiosInstance } from 'axios';

export class UserHttpGateway implements UserGateway {
  constructor(private http: AxiosInstance) {}
  async createUser(user: IUser): Promise<ILoginResult> {
    try {
      const response = await this.http.post<IUser>('/users', user);
      if (response.status != 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const result = await response.data;
        return {
          success: true,
          message: 'Usuário criado com sucesso',
          user: result as IUser,
        };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  async getUserById(id: string): Promise<IUser | null> {
    console.log(id);
    return null;
  }
  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const response = await this.http.get<IUser>(
        `/users/${encodeURIComponent(email)}`
      );

      if (!response) {
        throw new Error(`HTTP error! status`);
      }

      return response.data as IUser;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }
  async updateUser(user: IUser): Promise<void> {
    console.log(user);
  }
  async deleteUser(id: string): Promise<void> {
    console.log(id);
  }
}
