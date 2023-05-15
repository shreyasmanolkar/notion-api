import { DeleteUserRepository } from '@application/interfaces/repositories/users/deleteUserRepository';
import { DeleteUserInterface } from '@application/interfaces/use-cases/users/DeleteUserInterface';

export class DeleteUser implements DeleteUserInterface {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async execute(
    userId: DeleteUserInterface.Request
  ): Promise<DeleteUserInterface.Response> {
    await this.deleteUserRepository.deleteUser(userId);
  }
}
