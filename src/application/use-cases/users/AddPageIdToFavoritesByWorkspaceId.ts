import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddPageIdToFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/addPageIdToFavoritesByWorkspaceIdRepository';
import { GetWorkspacesByUserIdRepository } from '@application/interfaces/repositories/users/getWorkspacesByUserIdRepository';
import { AddPageIdToFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/AddPageIdToFavoritesByWorkspaceIdInterface';

export class AddPageIdToFavoritesByWorkspaceId
  implements AddPageIdToFavoritesByWorkspaceIdInterface
{
  constructor(
    private readonly getWorkspacesByUserIdRepository: GetWorkspacesByUserIdRepository,
    private readonly addPageIdToFavoritesByWorkspaceIdRepository: AddPageIdToFavoritesByWorkspaceIdRepository
  ) {}

  async execute(
    params: AddPageIdToFavoritesByWorkspaceIdInterface.Request
  ): Promise<AddPageIdToFavoritesByWorkspaceIdInterface.Response> {
    const { userId, workspaceId, pageId } = params;

    const allWorkspaces =
      await this.getWorkspacesByUserIdRepository.getWorkspacesByUserId(userId);

    const verifiedWorkspace = allWorkspaces?.find(
      workspace => workspace.workspaceId === workspaceId
    );

    if (!verifiedWorkspace) {
      return new WorkspaceNotFoundError();
    }

    await this.addPageIdToFavoritesByWorkspaceIdRepository.addPageIdToFavoritesByWorkspaceId(
      {
        userId,
        workspaceId,
        pageId,
      }
    );
  }
}
