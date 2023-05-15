import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { AddWorkspaceByUserIdRepository } from '@application/interfaces/repositories/users/addWorkspaceByUserIdRepository';
import { GetUserByIdRepository } from '@application/interfaces/repositories/users/getUserByIdRepository';
import { AddWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/AddWorkspaceByUserIdInterface';

export class AddWorkspaceByUserId implements AddWorkspaceByUserIdInterface {
  constructor(
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly addWorkspaceByIdRepository: AddWorkspaceByUserIdRepository
  ) {}

  async execute(
    params: AddWorkspaceByUserIdInterface.Request
  ): Promise<AddWorkspaceByUserIdInterface.Response> {
    const { userId, workspaceId } = params;

    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      return new UserNotFoundError();
    }

    await this.addWorkspaceByIdRepository.addWorkspaceByUserId({
      userId,
      workspaceId,
    });
  }
}
