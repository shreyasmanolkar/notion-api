import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/getFavoritesByWorkspaceIdRepository';
import { GetWorkspacesByUserIdRepository } from '@application/interfaces/repositories/users/getWorkspacesByUserIdRepository';
import { GetFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/GetFavoritesByWorkspaceIdInterface';

export class GetFavoritesByWorkspaceId
  implements GetFavoritesByWorkspaceIdInterface
{
  constructor(
    private readonly getWorkspacesByUserIdRepository: GetWorkspacesByUserIdRepository,
    private readonly getFavotitesByWorkspaceIdRepository: GetFavoritesByWorkspaceIdRepository
  ) {}

  async execute(
    params: GetFavoritesByWorkspaceIdInterface.Request
  ): Promise<GetFavoritesByWorkspaceIdInterface.Response> {
    const { userId, workspaceId } = params;

    const allWorkspaces =
      await this.getWorkspacesByUserIdRepository.getWorkspacesByUserId(userId);

    const verifiedWorkspace = allWorkspaces?.find(
      workspace => workspace.workspaceId === workspaceId
    );

    if (!verifiedWorkspace) {
      return new WorkspaceNotFoundError();
    }

    const favorites =
      await this.getFavotitesByWorkspaceIdRepository.getFavoritesByWorkspaceId({
        userId,
        workspaceId,
      });

    return favorites!;
  }
}
