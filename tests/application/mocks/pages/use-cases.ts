/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AddToFavoriteInterface } from '@application/interfaces/use-cases/pages/addToFavoriteInterface';
import { CreatePageInterface } from '@application/interfaces/use-cases/pages/createPageInterface';
import { DeletePageInterface } from '@application/interfaces/use-cases/pages/deletePageInterface';
import { DeletePagesByWorkspaceIdInterface } from '@application/interfaces/use-cases/pages/deletePagesByWorkspaceIdInterface';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { GetPageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageContentByPageIdInterface';
import { GetPageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageSettingsByPageIdInterface';
import { RemoveFromFavoriteInterface } from '@application/interfaces/use-cases/pages/removeFromFavoriteInterface';
import { UpdatePageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageContentByPageIdInterface';
import { UpdatePageCoverByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageCoverByPageIdInterface';
import { UpdatePageIconByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageIconByPageIdInterface';
import { UpdatePageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageSettingsByPageIdInterface';
import { UpdatePageTitleByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageTitleByPageIdInterface';
import mockPage from '@tests/domain/mock-page';

export class AddToFavoriteStub implements AddToFavoriteInterface {
  async execute(
    _params: AddToFavoriteInterface.Request
  ): Promise<AddToFavoriteInterface.Response> {}
}

export class CreatePageStub implements CreatePageInterface {
  async execute(
    _pageData: CreatePageInterface.Request
  ): Promise<CreatePageInterface.Response> {
    const { id } = mockPage();
    return id;
  }
}

export class DeletePageStub implements DeletePageInterface {
  async execute(
    _pageId: DeletePageInterface.Request
  ): Promise<DeletePageInterface.Response> {}
}

export class DeletePagesByWorkspaceIdStub
  implements DeletePagesByWorkspaceIdInterface
{
  async execute(
    _workspaceId: DeletePagesByWorkspaceIdInterface.Request
  ): Promise<DeletePagesByWorkspaceIdInterface.Response> {}
}

export class GetPageByIdStub implements GetPageByIdInterface {
  async execute(
    _pageId: GetPageByIdInterface.Request
  ): Promise<GetPageByIdInterface.Response> {
    const page = mockPage();
    return page;
  }
}

export class GetPageContentByPageIdStub
  implements GetPageContentByPageIdInterface
{
  async execute(
    _pageId: GetPageContentByPageIdInterface.Request
  ): Promise<GetPageContentByPageIdInterface.Response> {
    const { content } = mockPage();
    return content;
  }
}

export class GetPageSettingsByPageIdStub
  implements GetPageSettingsByPageIdInterface
{
  async execute(
    _pageId: GetPageSettingsByPageIdInterface.Request
  ): Promise<GetPageSettingsByPageIdInterface.Response> {
    const { pageSettings } = mockPage();
    return pageSettings;
  }
}

export class RemoveFromFavoriteStub implements RemoveFromFavoriteInterface {
  async execute(
    _params: RemoveFromFavoriteInterface.Request
  ): Promise<RemoveFromFavoriteInterface.Response> {}
}

export class UpdatePageContentByPageIdStub
  implements UpdatePageContentByPageIdInterface
{
  async execute(
    _params: UpdatePageContentByPageIdInterface.Request
  ): Promise<UpdatePageContentByPageIdInterface.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageCoverByPageIdStub
  implements UpdatePageCoverByPageIdInterface
{
  async execute(
    _params: UpdatePageCoverByPageIdInterface.Request
  ): Promise<UpdatePageCoverByPageIdInterface.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageIconByPageIdStub
  implements UpdatePageIconByPageIdInterface
{
  async execute(
    _params: UpdatePageIconByPageIdInterface.Request
  ): Promise<UpdatePageIconByPageIdInterface.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageSettingsByPageIdStub
  implements UpdatePageSettingsByPageIdInterface
{
  async execute(
    _params: UpdatePageSettingsByPageIdInterface.Request
  ): Promise<UpdatePageSettingsByPageIdInterface.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageTitleByPageIdStub
  implements UpdatePageTitleByPageIdInterface
{
  async execute(
    _params: UpdatePageTitleByPageIdInterface.Request
  ): Promise<UpdatePageTitleByPageIdInterface.Response> {
    const page = mockPage();
    return page;
  }
}