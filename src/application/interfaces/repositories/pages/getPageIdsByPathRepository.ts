export namespace GetPageIdsByPathRepository {
  export type Request = string;
  export type Response = string[] | [] | null;
}

export interface GetPageIdsByPathRepository {
  getPageIdsByPath(
    path: GetPageIdsByPathRepository.Request
  ): Promise<GetPageIdsByPathRepository.Response>;
}
