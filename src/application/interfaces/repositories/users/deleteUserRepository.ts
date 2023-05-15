export namespace DeleteUserRepository {
  export type Request = string;
  export type Response = void;
}

export interface DeleteUserRepository {
  deleteComment(
    userId: DeleteUserRepository.Request
  ): Promise<DeleteUserRepository.Response>;
}
