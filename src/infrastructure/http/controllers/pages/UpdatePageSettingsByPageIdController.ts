import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { PageSettingsType } from '@domain/entities/Page';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { UpdatePageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageSettingsByPageIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace UpdatePageSettingsByPageIdController {
  export type Request = HttpRequest<
    { settings: PageSettingsType },
    { pageId: string }
  >;
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class UpdatePageSettingsByPageIdController extends BaseController {
  constructor(
    private readonly updatePageSettingsByPageIdValidation: Validation,
    private readonly getPageById: GetPageByIdInterface,
    private readonly updatePageSettingsByPageId: UpdatePageSettingsByPageIdInterface
  ) {
    super(updatePageSettingsByPageIdValidation);
  }

  async execute(
    httpRequest: UpdatePageSettingsByPageIdController.Request
  ): Promise<UpdatePageSettingsByPageIdController.Response> {
    const { pageId } = httpRequest.params!;
    const { settings } = httpRequest.body!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.updatePageSettingsByPageId.execute({
      pageId,
      settings,
    });

    return noContent();
  }
}
