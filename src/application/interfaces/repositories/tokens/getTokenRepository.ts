export namespace GetTokenRepository {
  export type Request = string;
  export type Response = {
    _id: string;
    token: string;
    createdAt: Date;
  } | null;
}

export interface GetTokenRepository {
  getToken(
    token: GetTokenRepository.Request
  ): Promise<GetTokenRepository.Response>;
}
