/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddToFavoriteRepository } from '@application/interfaces/repositories/pages/addToFavoriteRepository';
import { CreatePageRepository } from '@application/interfaces/repositories/pages/createPageRepository';
import { DeletePageRepository } from '@application/interfaces/repositories/pages/deletePageRepository';
import { DeletePagesByWorkspaceIdRepository } from '@application/interfaces/repositories/pages/deletePagesByWorkspaceIdRepository';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { GetPageContentByPageIdRepository } from '@application/interfaces/repositories/pages/getPageContentByPageIdRepository';
import { GetPageIdsByPathRepository } from '@application/interfaces/repositories/pages/getPageIdsByPathRepository';
import { GetPageSettingsByPageIdRepository } from '@application/interfaces/repositories/pages/getPageSettingsByPageIdRepository';
import { RemoveFromFavoriteRepository } from '@application/interfaces/repositories/pages/removeFromFavoriteRepository';
import { UpdatePageContentByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageContentByPageIdRepository';
import { UpdatePageCoverByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageCoverByPageIdRepository';
import { UpdatePageIconByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageIconByPageIdRepository';
import { UpdatePagePathByPageIdRepository } from '@application/interfaces/repositories/pages/updatePagePathByPageIdRepository';
import { UpdatePageSettingsByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageSettingsByPageIdRepository';
import { UpdatePageTitleByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageTitleByPageIdRepository';
import { Page } from '@domain/entities/Page';
import mockPage from '@tests/domain/mock-page';

export class CreatePageRepositoryStub implements CreatePageRepository {
  async createPage(
    _pageData: CreatePageRepository.Request
  ): Promise<CreatePageRepository.Response> {
    const { id } = mockPage();
    return id;
  }
}

export class AddToFavoriteRepositoryStub implements AddToFavoriteRepository {
  async addToFavorite(
    params: AddToFavoriteRepository.Request
  ): Promise<AddToFavoriteRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class GetPageByIdRepositoryStub implements GetPageByIdRepository {
  async getPageById(
    pageId: GetPageByIdRepository.Request
  ): Promise<GetPageByIdRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class GetPageContentByPageIdRepositoryStub
  implements GetPageContentByPageIdRepository
{
  async getPageContentByPageId(
    pageId: GetPageContentByPageIdRepository.Request
  ): Promise<GetPageContentByPageIdRepository.Response> {
    const { content } = mockPage();
    return content;
  }
}

export class GetPageSettingsByPageIdRepositoryStub
  implements GetPageSettingsByPageIdRepository
{
  async getPageSettingsByPageId(
    pageId: GetPageSettingsByPageIdRepository.Request
  ): Promise<GetPageSettingsByPageIdRepository.Response> {
    const { pageSettings } = mockPage();
    return pageSettings;
  }
}

export class GetPageIdsByPathRepositoryStub
  implements GetPageIdsByPathRepository
{
  async getPageIdsByPath(
    _path: GetPageIdsByPathRepository.Request
  ): Promise<GetPageIdsByPathRepository.Response> {
    const { id } = mockPage();
    return [id];
  }
}

export class UpdatePageContentByPageIdRepositoryStub
  implements UpdatePageContentByPageIdRepository
{
  async updatePageContentByPageId(
    params: UpdatePageContentByPageIdRepository.Request
  ): Promise<UpdatePageContentByPageIdRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageCoverByPageIdRepositoryStub
  implements UpdatePageCoverByPageIdRepository
{
  async updatePageCoverByPageId(
    params: UpdatePageCoverByPageIdRepository.Request
  ): Promise<UpdatePageCoverByPageIdRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageIconByPageIdRepositoryStub
  implements UpdatePageIconByPageIdRepository
{
  async updatePageIconByPageId(
    params: UpdatePageIconByPageIdRepository.Request
  ): Promise<UpdatePageIconByPageIdRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageSettingsByPageIdRepositoryStub
  implements UpdatePageSettingsByPageIdRepository
{
  async updatePageSettingsByPageId(
    params: UpdatePageSettingsByPageIdRepository.Request
  ): Promise<UpdatePageSettingsByPageIdRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePageTitleByPageIdRepositoryStub
  implements UpdatePageTitleByPageIdRepository
{
  async updatePageTitleByPageId(
    params: UpdatePageTitleByPageIdRepository.Request
  ): Promise<UpdatePageTitleByPageIdRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class UpdatePagePathByPageIdRepositoryStub
  implements UpdatePagePathByPageIdRepository
{
  async updatePagePathByPageId(
    params: UpdatePagePathByPageIdRepository.Request
  ): Promise<UpdatePagePathByPageIdRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class RemoveFromFavoriteRepositoryStub
  implements RemoveFromFavoriteRepository
{
  async removeFromFavorite(
    params: RemoveFromFavoriteRepository.Request
  ): Promise<RemoveFromFavoriteRepository.Response> {
    const page = mockPage();
    return page;
  }
}

export class DeletePageRepositoryStub implements DeletePageRepository {
  async deletePage(
    pageId: DeletePageRepository.Request
  ): Promise<DeletePageRepository.Response> {}
}

export class DeletePagesByWorkspaceIdRepositoryStub
  implements DeletePagesByWorkspaceIdRepository
{
  async deletePagesByWorkspaceId(
    workspaceId: DeletePagesByWorkspaceIdRepository.Request
  ): Promise<DeletePagesByWorkspaceIdRepository.Response> {}
}
