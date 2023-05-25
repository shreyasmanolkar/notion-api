import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { RemovePageByPageIdRepository } from '@application/interfaces/repositories/workspaces/removePageByPageIdRepository';
import { RemovePageByPageIdInterface } from '@application/interfaces/use-cases/workspaces/RemovePageByPageIdInterface';

export class RemovePageByPageId implements RemovePageByPageIdInterface {
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly removePageByPageIdRepository: RemovePageByPageIdRepository
  ) {}

  async execute(
    params: RemovePageByPageIdInterface.Request
  ): Promise<RemovePageByPageIdInterface.Response> {
    const { workspaceId, pageId } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    await this.removePageByPageIdRepository.removePageByPageId({
      workspaceId,
      pageId,
    });
  }
}
