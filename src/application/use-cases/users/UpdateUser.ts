import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { GetUserByIdRepository } from '@application/interfaces/repositories/users/getUserByIdRepository';
import { UpdateUserRepository } from '@application/interfaces/repositories/users/updateUserRepository';
import { UpdateUserInterface } from '@application/interfaces/use-cases/users/UpdateUserInterface';

export class UpdateUser implements UpdateUserInterface {
  constructor(
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly updateUserRepository: UpdateUserRepository
  ) {}

  async execute(
    params: UpdateUserInterface.Request
  ): Promise<UpdateUserInterface.Response> {
    const { userId, userData } = params;
    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      return new UserNotFoundError();
    }

    const updated = await this.updateUserRepository.updateUser({
      userId,
      userData,
    });

    return updated;
  }
}
