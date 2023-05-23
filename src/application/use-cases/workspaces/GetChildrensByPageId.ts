import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetChildrensByPageIdRepository } from '@application/interfaces/repositories/workspaces/getChildrensByPageRepsoitory';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { GetChildrensByPageIdInterface } from '@application/interfaces/use-cases/workspaces/GetChildrensByPageIdInterface';

export class GetChildrensByPageId implements GetChildrensByPageIdInterface {
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly getChildrensByPageIdRepository: GetChildrensByPageIdRepository
  ) {}

  async execute(
    params: GetChildrensByPageIdInterface.Request
  ): Promise<GetChildrensByPageIdInterface.Response> {
    const { workspaceId, pageId } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    return this.getChildrensByPageIdRepository.getChildrensByPageId({
      workspaceId,
      pageId,
    });
  }
}
