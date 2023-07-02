import { Collection } from 'mongodb';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import env from '@main/config/env';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';
import mockPage from '@tests/domain/mock-page';
import { objectIdToString } from '@infrastructure/db/mongodb/helpers/mapper';

describe('Page Repository', () => {
  let pageCollection: Collection;

  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  beforeEach(async () => {
    pageCollection = await PageRepository.getCollection();
    await pageCollection.deleteMany({});
  });

  describe('CreatePage', () => {
    it('should create a new Page and return an id on success', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
      } = mockPage();

      const response = await pageRepository.createPage({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
      });

      const count = await pageCollection.countDocuments();

      expect(response).toBeTruthy();
      expect(count).toBe(1);
    });
  });

  describe('AddToFavorite', () => {
    it('should add provided userId to favorite and return page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const userId = 'sample-user-Id';

      const updatedPage = await pageRepository.addToFavorite({
        pageId: objectIdToString(insertedId),
        userId,
      });

      expect(updatedPage.favorite).toHaveLength(2);
    });
  });

  describe('GetPageById', () => {
    it('should return page if page exists', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const response = await pageRepository.getPageById(
        objectIdToString(insertedId)
      );

      expect(response).toBeTruthy();
    });

    it(`should return null if user dosen't exists`, async () => {
      const pageRepository = new PageRepository();

      const response = await pageRepository.getPageById(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it(`should return null if an invalid object-id is provided`, async () => {
      const pageRepository = new PageRepository();

      const response = await pageRepository.getPageById('invalid_id');

      expect(response).toBeNull();
    });
  });

  describe('getPageContentByPageId', () => {
    it('should return page content if page exists', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const response = await pageRepository.getPageContentByPageId(
        objectIdToString(insertedId)
      );

      expect(response).toBeTruthy();
    });

    it(`should return null if user dosen't exists`, async () => {
      const pageRepository = new PageRepository();

      const response = await pageRepository.getPageContentByPageId(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it(`should return null if an invalid object-id is provided`, async () => {
      const pageRepository = new PageRepository();

      const response = await pageRepository.getPageContentByPageId(
        'invalid_id'
      );

      expect(response).toBeNull();
    });
  });

  describe('getPageSettingsByPageId', () => {
    it('should return page settings if page exists', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const response = await pageRepository.getPageSettingsByPageId(
        objectIdToString(insertedId)
      );

      expect(response).toBeTruthy();
    });

    it(`should return null if user dosen't exists`, async () => {
      const pageRepository = new PageRepository();

      const response = await pageRepository.getPageSettingsByPageId(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it(`should return null if an invalid object-id is provided`, async () => {
      const pageRepository = new PageRepository();

      const response = await pageRepository.getPageSettingsByPageId(
        'invalid_id'
      );

      expect(response).toBeNull();
    });
  });

  describe('GetPageIdsByPath', () => {
    it('should return all pageIds by path', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      await pageCollection.insertOne({
        title: 'new title',
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference: 'new-title-1234',
      });

      const pageIds = await pageRepository.getPageIdsByPath(path!);

      expect(pageIds).toHaveLength(2);
    });

    it(`should return empty array if page ids doesn't exist`, async () => {
      const pageRepository = new PageRepository();
      const response = await pageRepository.getPageIdsByPath('invalid-path');

      expect(response).toHaveLength(0);
    });
  });

  describe('UpdateUserProfilePicture', () => {
    it('should update page content and return updated page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const updatedContent = {
        type: 'doc',
        content: [
          {
            type: 'dBlock',
            content: [
              {
                type: 'heading',
                attrs: {
                  level: 2,
                },
                content: [
                  {
                    type: 'text',
                    text: 'Updated Notitap',
                  },
                ],
              },
            ],
          },
        ],
      };

      const updatedPage = await pageRepository.updatePageContentByPageId({
        pageId: objectIdToString(insertedId),
        content: updatedContent,
      });

      expect(updatedPage).toBeTruthy();
    });
  });

  describe('updatePageCoverByPageId', () => {
    it('should updated page cover and return updated page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const updatedCover = 'http://sample-new-cover-url.com';

      const updatedPage = await pageRepository.updatePageCoverByPageId({
        pageId: objectIdToString(insertedId),
        url: updatedCover,
        verticalPosition: 0,
      });

      expect(updatedPage.coverPicture.url).toBe(updatedCover);
      expect(updatedPage.coverPicture.verticalPosition).toBe(0);
    });
  });

  describe('updatePageIconByPageId', () => {
    it('should updated page icon and return updated page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const updatedIcon = 'updated-hex';

      const updatedPage = await pageRepository.updatePageIconByPageId({
        pageId: objectIdToString(insertedId),
        icon: updatedIcon,
      });

      expect(updatedPage.icon).toBe(updatedIcon);
    });
  });

  describe('updatePageSettingsByPageId', () => {
    it('should updated page settings and return updated page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const updatedSettings = {
        font: 'monospace',
        smallText: true,
        fullWidth: false,
        lock: false,
      };

      const updatedPage = await pageRepository.updatePageSettingsByPageId({
        pageId: objectIdToString(insertedId),
        pageSettings: updatedSettings,
      });

      expect(updatedPage.pageSettings.lock).toBe(false);
    });
  });

  describe('updatePageTitleByPageId', () => {
    it('should updated page title and return updated page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const updatedTitle = 'New-Title';

      const updatedPage = await pageRepository.updatePageTitleByPageId({
        pageId: objectIdToString(insertedId),
        title: updatedTitle,
      });

      expect(updatedPage.title).toBe(updatedTitle);
    });
  });

  describe('updatePagePathByPageId', () => {
    it('should updated page path and return updated page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const updatedPath = 'Parent-Page-path';

      const updatedPage = await pageRepository.updatePagePathByPageId({
        pageId: objectIdToString(insertedId),
        path: updatedPath,
      });

      expect(updatedPage.path).toBe(updatedPath);
    });
  });

  describe('RemoveFromFavorite', () => {
    it('should remove userId from favorites and return updated page', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite: [...favorite, 'new-user-id'],
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      const updatedPage = await pageRepository.removeFromFavorite({
        pageId: objectIdToString(insertedId),
        userId: 'new-user-id',
      });

      expect(updatedPage.favorite).toHaveLength(1);
    });
  });

  describe('DeletePage', () => {
    it('should delete a page on success', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      const { insertedId } = await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite: [...favorite, 'new-user-id'],
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      await pageRepository.deletePage(objectIdToString(insertedId));
      const count = await pageCollection.countDocuments();

      expect(count).toBe(0);
    });
  });

  describe('DeletePagesByWorkspaceId', () => {
    it('should delete all pages by workspaceId on success', async () => {
      const pageRepository = new PageRepository();

      const {
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      } = mockPage();

      await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId,
        reference,
      });

      await pageCollection.insertOne({
        title,
        icon,
        coverPicture,
        content,
        favorite,
        pageSettings,
        path,
        workspaceId: 'new-workspace-id',
        reference,
      });

      await pageRepository.deletePagesByWorkspaceId(workspaceId);
      const count = await pageCollection.countDocuments();

      expect(count).toBe(1);
    });
  });
});
