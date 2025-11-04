// src/@core/application/auth/login.use-case.ts
import { UserLocalGateway } from '@/@core/infra/gateways/user-local.gateway';
import { ILoginResult } from '@/Domain/Interfaces/ILoginResult';

export class LoginUseCase {
  constructor(private userGateway: UserLocalGateway) {}

  async execute(email: string, password: string): Promise<ILoginResult> {
    try {
      if (!email || !email.includes('@')) {
        return {
          success: false,
          message: 'Email inválido',
        };
      }

      if (!password || password.length < 6) {
        return {
          success: false,
          message: 'Senha deve ter pelo menos 6 caracteres',
        };
      }

      const user = await this.userGateway.getUserByEmail(email);

      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado',
        };
      }

      return {
        success: true,
        message: 'Login realizado com sucesso',
        user,
      };
    } catch (error) {
      console.error('LoginUseCase error:', error);
      return {
        success: false,
        message: 'Erro durante o login',
      };
    }
  }
}
