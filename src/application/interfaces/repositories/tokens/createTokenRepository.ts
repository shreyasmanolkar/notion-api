export namespace CreateTokenRepository {
  export type Request = string;
  export type Response = string;
}

export interface CreateTokenRepository {
  createToken(
    token: CreateTokenRepository.Request
  ): Promise<CreateTokenRepository.Response>;
}
