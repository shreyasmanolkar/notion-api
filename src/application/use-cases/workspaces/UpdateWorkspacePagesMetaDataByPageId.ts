import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { UpdateWorkspacePagesMetaDataByPageIdRepository } from '@application/interfaces/repositories/workspaces/updateWorkspacePagesMetaDataByPageIdRepository';
import { UpdateWorkspacePagesMetaDataByPageIdInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspacePagesMetaDataByPageIdInterface';

export class UpdateWorkspacePagesMetaDataByPageId
  implements UpdateWorkspacePagesMetaDataByPageIdInterface
{
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly updateWorkspacePagesMetaDataByPageIdRepository: UpdateWorkspacePagesMetaDataByPageIdRepository
  ) {}

  async execute(
    params: UpdateWorkspacePagesMetaDataByPageIdInterface.Request
  ): Promise<UpdateWorkspacePagesMetaDataByPageIdInterface.Response> {
    const { workspaceId, pageId, pageData } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    await this.updateWorkspacePagesMetaDataByPageIdRepository.updateWorkspacePagesMetaDataByPageId(
      {
        workspaceId,
        pageId,
        pageData,
      }
    );
  }
}
