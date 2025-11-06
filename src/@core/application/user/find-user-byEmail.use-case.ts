import { UserHttpGateway } from '@/@core/infra/gateways/user-http.gateway';
import { IUser } from '@/Domain/Interfaces/IUser';

export class FindUserByEmailUseCase {
  constructor(private userGateway: UserHttpGateway) {}
  async execute(email: string): Promise<IUser | null> {
    return this.userGateway.getUserByEmail(email);
  }
}
