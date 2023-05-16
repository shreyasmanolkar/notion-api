import { GetWorkspacesByUserIdRepository } from '@application/interfaces/repositories/users/getWorkspacesByUserIdRepository';
import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';

export class GetWorkspacesByUserId implements GetWorkspacesByUserIdInterface {
  constructor(
    private readonly getWorkspacesByUserIdRepository: GetWorkspacesByUserIdRepository
  ) {}

  async execute(
    userId: GetWorkspacesByUserIdInterface.Request
  ): Promise<GetWorkspacesByUserIdInterface.Response> {
    const workspaces =
      await this.getWorkspacesByUserIdRepository.getWorkspacesByUserId(userId);

    return workspaces!;
  }
}
