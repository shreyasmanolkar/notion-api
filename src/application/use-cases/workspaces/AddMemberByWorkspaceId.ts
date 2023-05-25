import { AddMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/AddMemberByWorkspaceIdInterface';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { AddMemberByWorkspaceIdRepository } from '@application/interfaces/repositories/workspaces/addMemberByWorkspaceIdRepository';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';

export class AddMemberByWorkspaceId implements AddMemberByWorkspaceIdInterface {
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly addMemberByWorkspaceIdRepository: AddMemberByWorkspaceIdRepository
  ) {}

  async execute(
    params: AddMemberByWorkspaceIdInterface.Request
  ): Promise<AddMemberByWorkspaceIdInterface.Response> {
    const { workspaceId, memberId } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    await this.addMemberByWorkspaceIdRepository.addMemberByWorkspaceId({
      workspaceId,
      memberId,
    });
  }
}
