import { UserLocalGateway } from '@/@core/infra/gateways/user-local.gateway';
import { ILoginResult } from '@/Domain/Interfaces/ILoginResult';
import { IUser } from '@/Domain/Interfaces/IUser';

export class RegisterUserUseCase {
  constructor(private userLocalGateway: UserLocalGateway) {}
  async execute(user: IUser): Promise<ILoginResult> {
    return this.userLocalGateway.createUser(user);
  }
}
