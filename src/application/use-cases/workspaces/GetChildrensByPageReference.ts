import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetChildrensByPageReferenceRepository } from '@application/interfaces/repositories/workspaces/getChildrensByPageReferenceRepsoitory';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { GetChildrensByPageReferenceInterface } from '@application/interfaces/use-cases/workspaces/GetChildrensByPageReferenceInterface';

export class GetChildrensByPageReference
  implements GetChildrensByPageReferenceInterface
{
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly getChildrensByPageReferenceRepository: GetChildrensByPageReferenceRepository
  ) {}

  async execute(
    params: GetChildrensByPageReferenceInterface.Request
  ): Promise<GetChildrensByPageReferenceInterface.Response> {
    const { workspaceId, pageReference } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    return this.getChildrensByPageReferenceRepository.getChildrensByPageId({
      workspaceId,
      pageReference,
    });
  }
}
