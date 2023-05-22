export namespace DeleteTokenRepository {
  export type Request = string;
  export type Response = void;
}

export interface DeleteTokenRepository {
  deleteToken(
    token: DeleteTokenRepository.Request
  ): Promise<DeleteTokenRepository.Response>;
}
