import { UserGateway } from '@/@core/domain/gateways/user.gateway';
import { ILoginResult } from '@/Domain/Interfaces/ILoginResult';
import { IUser } from '@/Domain/Interfaces/IUser';

export class UserLocalGateway implements UserGateway {
  constructor() {}
  async createUser(user: IUser): Promise<ILoginResult> {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const result = await response.json();
        return {
          success: true,
          message: 'Usuário criado com sucesso',
          user: result.data as IUser,
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
      const response = await fetch(`/api/users/${encodeURIComponent(email)}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.data) {
        return result.data as IUser;
      }

      return null;
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
