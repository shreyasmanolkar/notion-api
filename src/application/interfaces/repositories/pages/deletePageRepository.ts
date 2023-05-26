export namespace DeletePageRepository {
  export type Request = string;
  export type Response = void;
}

export interface DeletePageRepository {
  deletePage(
    pageId: DeletePageRepository.Request
  ): Promise<DeletePageRepository.Response>;
}
