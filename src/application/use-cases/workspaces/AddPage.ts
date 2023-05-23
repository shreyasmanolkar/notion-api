import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddPageRepository } from '@application/interfaces/repositories/workspaces/addPageRepository';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { AddPageInterface } from '@application/interfaces/use-cases/workspaces/AddPageInterface';

export class AddPage implements AddPageInterface {
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly addPageRepository: AddPageRepository
  ) {}

  async execute(
    params: AddPageInterface.Request
  ): Promise<AddPageInterface.Response> {
    const { workspaceId, pageData } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    const updated = await this.addPageRepository.addPage({
      workspaceId,
      pageData,
    });

    return updated;
  }
}
