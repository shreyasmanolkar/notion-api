import { UpdateUserWorkspaceMetaDataByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/UpdateUserWorkspaceMetaDataByWorkspaceIdInterface';
import { UpdateUserWorkspaceMetaDataByWorkspaceId } from '@application/use-cases/users/UpdateUserWorkspaceMetaDataByWorkspaceId';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeUpdateUserWorkspaceMetaDataByWorkspaceId =
  (): UpdateUserWorkspaceMetaDataByWorkspaceIdInterface => {
    const userRepository = new UserRepository();

    return new UpdateUserWorkspaceMetaDataByWorkspaceId(
      userRepository,
      userRepository
    );
  };
