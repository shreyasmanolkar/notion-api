import { ForbiddenError } from '@application/errors/ForbiddenError';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { GetWorkspacesByUserIdRepository } from '@application/interfaces/repositories/users/getWorkspacesByUserIdRepository';
import { AuthorizationInterface } from '@application/interfaces/use-cases/pages/authorizationInterface';

export class Authorization implements AuthorizationInterface {
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly getWorkspacesByUserIdRepository: GetWorkspacesByUserIdRepository
  ) {}

  async execute(
    params: AuthorizationInterface.Request
  ): Promise<AuthorizationInterface.Response> {
    const { userId, pageId } = params;

    const userWorkspaces =
      await this.getWorkspacesByUserIdRepository.getWorkspacesByUserId(userId);

    const pageWorkspaceOrError = await this.getPageByIdRepository.getPageById(
      pageId
    );

    if (!pageWorkspaceOrError) {
      return new PageNotFoundError();
    }

    const pageWorkspaceId = pageWorkspaceOrError.workspaceId;

    const accessOrError = userWorkspaces?.find(
      userWorkspace => userWorkspace.workspaceId === pageWorkspaceId
    );

    if (!accessOrError) {
      return new ForbiddenError();
    }

    return accessOrError.workspaceId;
  }
}
