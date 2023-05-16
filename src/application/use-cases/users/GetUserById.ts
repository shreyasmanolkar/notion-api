import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { GetUserByIdRepository } from '@application/interfaces/repositories/users/getUserByIdRepository';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/users/GetUserByIdInterface';

export class GetUserById implements GetUserByIdInterface {
  constructor(private readonly getUserByIdRepository: GetUserByIdRepository) {}

  async execute(
    userId: GetUserByIdInterface.Request
  ): Promise<GetUserByIdInterface.Response> {
    const user = await this.getUserByIdRepository.getUserById(userId);
    if (!user) {
      return new UserNotFoundError();
    }
    return user;
  }
}
