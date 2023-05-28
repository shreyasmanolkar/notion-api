import { DeletePagesByWorkspaceIdInterface } from '@application/interfaces/use-cases/pages/deletePagesByWorkspaceIdInterface';
import { DeletePagesByWorkspaceId } from '@application/use-cases/pages/DeletePagesByWorkspaceId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeDeletePagesByWorkspaceId =
  (): DeletePagesByWorkspaceIdInterface => {
    const pageRepository = new PageRepository();

    return new DeletePagesByWorkspaceId(pageRepository);
  };
