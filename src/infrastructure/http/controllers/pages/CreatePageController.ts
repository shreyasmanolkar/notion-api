import { CreatePageInterface } from '@application/interfaces/use-cases/pages/createPageInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { created } from '@infrastructure/http/helpers/http';

export namespace CreatePageController {
  export type Request = HttpRequest<CreatePageInterface.Request>;
  export type Response = HttpResponse<{ id: string }>;
}

export class CreatePageController extends BaseController {
  constructor(
    private readonly createPageValidation: Validation,
    private readonly createPage: CreatePageInterface
  ) {
    super(createPageValidation);
  }

  async execute(
    httpRequest: CreatePageController.Request
  ): Promise<CreatePageController.Response> {
    const {
      title,
      icon,
      coverPicture,
      content,
      favorite,
      pageSettings,
      path,
      workspaceId,
    } = httpRequest.body!;

    const id = await this.createPage.execute({
      title,
      icon,
      coverPicture,
      content,
      favorite,
      pageSettings,
      path,
      workspaceId,
    });

    return created({ id });
  }
}
