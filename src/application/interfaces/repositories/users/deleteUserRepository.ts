export namespace DeleteUserRepository {
  export type Request = string;
  export type Response = void;
}

export interface DeleteUserRepository {
  deleteUser(
    userId: DeleteUserRepository.Request
  ): Promise<DeleteUserRepository.Response>;
}
