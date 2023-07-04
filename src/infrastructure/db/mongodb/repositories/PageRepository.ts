import { randomBytes } from 'crypto';
import { Collection, SetFields } from 'mongodb';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import { CreatePageRepository } from '@application/interfaces/repositories/pages/createPageRepository';
import {
  isValidObjectId,
  mapDocument,
  objectIdToString,
  stringToObjectId,
} from '@infrastructure/db/mongodb/helpers/mapper';
import { AddToFavoriteRepository } from '@application/interfaces/repositories/pages/addToFavoriteRepository';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { GetPageContentByPageIdRepository } from '@application/interfaces/repositories/pages/getPageContentByPageIdRepository';
import { GetPageSettingsByPageIdRepository } from '@application/interfaces/repositories/pages/getPageSettingsByPageIdRepository';
import { UpdatePageContentByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageContentByPageIdRepository';
import { UpdatePageCoverByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageCoverByPageIdRepository';
import { UpdatePageIconByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageIconByPageIdRepository';
import { UpdatePageSettingsByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageSettingsByPageIdRepository';
import { UpdatePageTitleByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageTitleByPageIdRepository';
import { RemoveFromFavoriteRepository } from '@application/interfaces/repositories/pages/removeFromFavoriteRepository';
import { DeletePageRepository } from '@application/interfaces/repositories/pages/deletePageRepository';
import { DeletePagesByWorkspaceIdRepository } from '@application/interfaces/repositories/pages/deletePagesByWorkspaceIdRepository';
import { GetPageIdsByPathRepository } from '@application/interfaces/repositories/pages/getPageIdsByPathRepository';
import { UpdatePagePathByPageIdRepository } from '@application/interfaces/repositories/pages/updatePagePathByPageIdRepository';

export class PageRepository
  implements
    CreatePageRepository,
    AddToFavoriteRepository,
    GetPageByIdRepository,
    GetPageContentByPageIdRepository,
    GetPageSettingsByPageIdRepository,
    GetPageIdsByPathRepository,
    UpdatePageContentByPageIdRepository,
    UpdatePageCoverByPageIdRepository,
    UpdatePageIconByPageIdRepository,
    UpdatePageSettingsByPageIdRepository,
    UpdatePageTitleByPageIdRepository,
    UpdatePagePathByPageIdRepository,
    RemoveFromFavoriteRepository,
    DeletePageRepository,
    DeletePagesByWorkspaceIdRepository
{
  static async getCollection(): Promise<Collection> {
    return dbConnection.getCollection('pages');
  }

  async createPage(
    pageData: CreatePageRepository.Request
  ): Promise<CreatePageRepository.Response> {
    const collection = await PageRepository.getCollection();
    const uniqueId = randomBytes(16).toString('hex');
    const { title } = pageData;

    const titleArray = title.split(' ');
    const kebebTitle = titleArray.join('-');

    const reference = `${kebebTitle}-${uniqueId}`;

    const { insertedId } = await collection.insertOne({
      ...pageData,
      reference,
      createdAt: new Date(),
    });

    return objectIdToString(insertedId);
  }

  async addToFavorite(
    params: AddToFavoriteRepository.Request
  ): Promise<AddToFavoriteRepository.Response> {
    const collection = await PageRepository.getCollection();

    const { pageId, userId } = params;
    const { value: rawPage } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      {
        $addToSet: { favorite: userId },
      } as SetFields<Document>,
      { upsert: true, returnDocument: 'after' }
    );

    return mapDocument(rawPage);
  }

  async getPageById(
    pageId: GetPageByIdRepository.Request
  ): Promise<GetPageByIdRepository.Response> {
    if (!isValidObjectId(pageId)) {
      return null;
    }

    const collection = await PageRepository.getCollection();
    const rawPage = await collection.findOne({
      _id: stringToObjectId(pageId),
    });

    return rawPage && mapDocument(rawPage);
  }

  async getPageContentByPageId(
    pageId: GetPageContentByPageIdRepository.Request
  ): Promise<GetPageContentByPageIdRepository.Response> {
    if (!isValidObjectId(pageId)) {
      return null;
    }

    const collection = await PageRepository.getCollection();
    const rawContent = await collection.findOne(
      {
        _id: stringToObjectId(pageId),
      },
      {
        projection: { content: 1 },
      }
    );

    if (rawContent) {
      return rawContent.content;
    }

    return null;
  }

  async getPageSettingsByPageId(
    pageId: GetPageSettingsByPageIdRepository.Request
  ): Promise<GetPageSettingsByPageIdRepository.Response> {
    if (!isValidObjectId(pageId)) {
      return null;
    }

    const collection = await PageRepository.getCollection();
    const rawPageSettings = await collection.findOne(
      {
        _id: stringToObjectId(pageId),
      },
      {
        projection: { pageSettings: 1 },
      }
    );

    if (rawPageSettings) {
      return rawPageSettings.pageSettings;
    }

    return null;
  }

  async getPageIdsByPath(
    path: GetPageIdsByPathRepository.Request
  ): Promise<GetPageIdsByPathRepository.Response> {
    const collection = await PageRepository.getCollection();
    const rawPages = await collection
      .find(
        {
          path: { $eq: path },
        },
        {
          projection: { id: 1 },
        }
      )
      .toArray();

    // eslint-disable-next-line no-underscore-dangle
    const pageIds = rawPages.map(page => page._id.toString());
    return pageIds;
  }

  async updatePageContentByPageId(
    params: UpdatePageContentByPageIdRepository.Request
  ): Promise<UpdatePageContentByPageIdRepository.Response> {
    const collection = await PageRepository.getCollection();
    const { pageId, content } = params;

    const { value: rawPageContent } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      { $set: { content, updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );

    return mapDocument(rawPageContent);
  }

  async updatePageCoverByPageId(
    params: UpdatePageCoverByPageIdRepository.Request
  ): Promise<UpdatePageCoverByPageIdRepository.Response> {
    const collection = await PageRepository.getCollection();
    const { pageId, url, verticalPosition } = params;

    const { value: rawPageContent } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      { $set: { coverPicture: { url, verticalPosition } } },
      { upsert: true, returnDocument: 'after' }
    );

    return mapDocument(rawPageContent);
  }

  async updatePageIconByPageId(
    params: UpdatePageIconByPageIdRepository.Request
  ): Promise<UpdatePageIconByPageIdRepository.Response> {
    const collection = await PageRepository.getCollection();
    const { pageId, icon } = params;

    const { value: rawPageContent } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      { $set: { icon } },
      { upsert: true, returnDocument: 'after' }
    );

    return mapDocument(rawPageContent);
  }

  async updatePageSettingsByPageId(
    params: UpdatePageSettingsByPageIdRepository.Request
  ): Promise<UpdatePageSettingsByPageIdRepository.Response> {
    const collection = await PageRepository.getCollection();
    const { pageId, pageSettings } = params;

    const { value: rawPageContent } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      { $set: { pageSettings: { ...pageSettings } } },
      { upsert: true, returnDocument: 'after' }
    );

    return mapDocument(rawPageContent);
  }

  async updatePageTitleByPageId(
    params: UpdatePageTitleByPageIdRepository.Request
  ): Promise<UpdatePageTitleByPageIdRepository.Response> {
    const collection = await PageRepository.getCollection();
    const { pageId, title } = params;
    let previousReference = '';

    const rawReference = await collection.findOne(
      { _id: stringToObjectId(pageId) },
      { projection: { reference: 1 } }
    );

    if (rawReference) {
      previousReference = rawReference.reference;
    }

    const previousReferenceArray = previousReference.split('-');
    const uniqueId = previousReferenceArray.pop();

    const titleArray = title.split(' ');
    const kebebTitle = titleArray.join('-');

    const reference = `${kebebTitle}-${uniqueId}`;

    const { value: rawPageContent } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      { $set: { title, reference } },
      { upsert: true, returnDocument: 'after' }
    );

    return mapDocument(rawPageContent);
  }

  async updatePagePathByPageId(
    params: UpdatePagePathByPageIdRepository.Request
  ): Promise<UpdatePagePathByPageIdRepository.Response> {
    const collection = await PageRepository.getCollection();
    const { pageId, path } = params;

    const { value: rawPageContent } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      { $set: { path } },
      { upsert: true, returnDocument: 'after' }
    );

    return mapDocument(rawPageContent);
  }

  async removeFromFavorite(
    params: RemoveFromFavoriteRepository.Request
  ): Promise<RemoveFromFavoriteRepository.Response> {
    const collection = await PageRepository.getCollection();
    const { pageId, userId } = params;

    const { value: rawPage } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(pageId) },
      { $pull: { favorite: userId } } as SetFields<Document>,
      { returnDocument: 'after' }
    );
    return mapDocument(rawPage);
  }

  async deletePage(
    pageId: DeletePageRepository.Request
  ): Promise<DeletePageRepository.Response> {
    const collection = await PageRepository.getCollection();
    await collection.deleteOne({ _id: stringToObjectId(pageId) });
  }

  async deletePagesByWorkspaceId(
    workspaceId: DeletePagesByWorkspaceIdRepository.Request
  ): Promise<DeletePagesByWorkspaceIdRepository.Response> {
    const collection = await PageRepository.getCollection();
    await collection.deleteMany({
      workspaceId,
    });
  }
}
