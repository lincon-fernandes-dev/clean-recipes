import { UserHttpGateway } from '@/@core/infra/gateways/user-http.gateway';
import { ILoginResult } from '@/Domain/Interfaces/ILoginResult';
import { IUser } from '@/Domain/Interfaces/IUser';

export class RegisterUserUseCase {
  constructor(private userLocalGateway: UserHttpGateway) {}
  async execute(user: IUser): Promise<ILoginResult> {
    return this.userLocalGateway.createUser(user);
  }
}
