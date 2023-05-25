import { GetChildrensByPageReferenceInterface } from '@application/interfaces/use-cases/workspaces/GetChildrensByPageReferenceInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace GetChildrensByPageReferenceController {
  export type Request = HttpRequest<
    undefined,
    { workspaceId: string; pageReference: string }
  >;
  export type Response =
    HttpResponse<GetChildrensByPageReferenceInterface.Response>;
}

export class GetChildrensByPageReferenceController extends BaseController {
  constructor(
    private readonly getChildrensByPageReference: GetChildrensByPageReferenceInterface
  ) {
    super();
  }

  async execute(
    httpRequest: GetChildrensByPageReferenceController.Request
  ): Promise<GetChildrensByPageReferenceController.Response> {
    const { workspaceId, pageReference } = httpRequest.params!;

    const childrenOrError = await this.getChildrensByPageReference.execute({
      workspaceId,
      pageReference,
    });

    if (childrenOrError instanceof WorkspaceNotFoundError) {
      return notFound(childrenOrError);
    }
    return ok(childrenOrError);
  }
}
