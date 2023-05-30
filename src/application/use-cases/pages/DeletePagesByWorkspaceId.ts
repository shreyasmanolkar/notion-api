import { DeletePagesByWorkspaceIdRepository } from '@application/interfaces/repositories/pages/deletePagesByWorkspaceIdRepository';
import { DeletePagesByWorkspaceIdInterface } from '@application/interfaces/use-cases/pages/deletePagesByWorkspaceIdInterface';

export class DeletePagesByWorkspaceId
  implements DeletePagesByWorkspaceIdInterface
{
  constructor(
    private readonly deletePagesByWorkspaceIdRepository: DeletePagesByWorkspaceIdRepository
  ) {}

  async execute(
    workspaceId: DeletePagesByWorkspaceIdInterface.Request
  ): Promise<DeletePagesByWorkspaceIdInterface.Response> {
    await this.deletePagesByWorkspaceIdRepository.deletePagesByWorkspaceId(
      workspaceId
    );
  }
}
