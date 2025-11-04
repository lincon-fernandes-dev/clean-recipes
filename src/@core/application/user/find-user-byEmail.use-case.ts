import { UserLocalGateway } from '@/@core/infra/gateways/user-local.gateway';
import { IUser } from '@/Domain/Interfaces/IUser';

export class FindUserByEmailUseCase {
  constructor(private userGateway: UserLocalGateway) {}
  async execute(email: string): Promise<IUser | null> {
    return this.userGateway.getUserByEmail(email);
  }
}
