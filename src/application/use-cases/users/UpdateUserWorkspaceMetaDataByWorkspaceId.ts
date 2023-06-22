import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { GetUserByIdRepository } from '@application/interfaces/repositories/users/getUserByIdRepository';
import { UpdateUserWorkspaceMetaDataByWorkspaceIdRepository } from '@application/interfaces/repositories/users/updateUserWorkspaceMetaDataByWorkspaceIdRepository';
import { UpdateUserWorkspaceMetaDataByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/UpdateUserWorkspaceMetaDataByWorkspaceIdInterface';

export class UpdateUserWorkspaceMetaDataByWorkspaceId
  implements UpdateUserWorkspaceMetaDataByWorkspaceIdInterface
{
  constructor(
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly updateWorkspaceMetaDataByWorkspaceIdRepository: UpdateUserWorkspaceMetaDataByWorkspaceIdRepository
  ) {}

  async execute(
    params: UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Request
  ): Promise<UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Response> {
    const { userId, workspaceId, workspaceData } = params;

    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      return new UserNotFoundError();
    }

    await this.updateWorkspaceMetaDataByWorkspaceIdRepository.updateUserWorkspaceMetaDataByWorkspaceId(
      {
        userId,
        workspaceId,
        workspaceData,
      }
    );
  }
}
