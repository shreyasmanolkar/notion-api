import { User, UserProps } from '@domain/entities/User';

export namespace UpdateUserRepository {
  export type Request = {
    userId: string;
    userData: Partial<
      Omit<
        UserProps,
        'id' | 'createdAt' | 'updatedAt' | 'profilePicture' | 'workspaces'
      >
    >;
  };
  export type Response = User;
}

export interface UpdateUserRepository {
  updateUser(
    params: UpdateUserRepository.Request
  ): Promise<UpdateUserRepository.Response>;
}
