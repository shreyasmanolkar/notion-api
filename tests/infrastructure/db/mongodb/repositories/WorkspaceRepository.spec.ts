import { Collection } from 'mongodb';
import env from '@main/config/env';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';
import mockWorkspace from '@tests/domain/mock-workspace';
import { objectIdToString } from '@infrastructure/db/mongodb/helpers/mapper';

describe('Workspace Repository', () => {
  let workspaceCollection: Collection;

  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  beforeEach(async () => {
    workspaceCollection = await WorkspaceRepository.getCollection();
    await workspaceCollection.deleteMany({});
  });

  describe('CreateWorkspace', () => {
    it('should create a new workspace and return an id on success', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const response = await workspaceRepository.createWorkspace({
        name,
        icon,
        members,
        pages,
      });

      const count = await workspaceCollection.countDocuments();

      expect(response).toBeTruthy();
      expect(count).toBe(1);
    });
  });

  describe('AddMemberByWorkspaceId', () => {
    it('should add provided memberId to workspace and return workspace', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const memberId = 'sample-member-id-2';

      const updatedWorkspace = await workspaceRepository.addMemberByWorkspaceId(
        {
          workspaceId: objectIdToString(insertedId),
          memberId,
        }
      );

      expect(updatedWorkspace.members).toHaveLength(2);
    });
  });

  describe('AddPage', () => {
    it('should add new page with provided page data and return updated workspace', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const pageData = {
        id: 'sample-page-id-4',
        reference: 'sample-page-101',
        path: null,
        icon: '1F2F9',
        title: 'sample-page',
        createdAt: new Date(),
      };

      const updatedWorkspace = await workspaceRepository.addPage({
        workspaceId: objectIdToString(insertedId),
        pageData,
      });

      expect(updatedWorkspace.pages).toHaveLength(6);
    });
  });

  describe('GetAllMembersByWorkspaceId', () => {
    it('should return members array if workspace exists', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const response = await workspaceRepository.getAllMembersByWorkspaceId(
        objectIdToString(insertedId)
      );

      expect(response).toHaveLength(1);
    });

    it(`should return null if workspace dosen't exists`, async () => {
      const workspaceRepository = new WorkspaceRepository();
      const response = await workspaceRepository.getAllMembersByWorkspaceId(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it(`should return null if an invalid object-id is provided`, async () => {
      const workspaceRepository = new WorkspaceRepository();
      const response = await workspaceRepository.getAllMembersByWorkspaceId(
        'invalid_id'
      );

      expect(response).toBeNull();
    });
  });

  describe('GetAllRootPages', () => {
    it('should return array of pages at root level if workspace exists', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const response = await workspaceRepository.getAllRootPages(
        objectIdToString(insertedId)
      );

      expect(response).toHaveLength(2);
    });

    it(`should return null if workspace dosen't exists`, async () => {
      const workspaceRepository = new WorkspaceRepository();
      const response = await workspaceRepository.getAllRootPages(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it(`should return null if an invalid object-id is provided`, async () => {
      const workspaceRepository = new WorkspaceRepository();
      const response = await workspaceRepository.getAllRootPages('invalid_id');

      expect(response).toBeNull();
    });
  });

  describe('GetChildrensByPageId', () => {
    it('should return array of pages that are children of given pageId', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const response = await workspaceRepository.getChildrensByPageId({
        workspaceId: objectIdToString(insertedId),
        pageReference: 'sample-page-123',
      });

      expect(response).toHaveLength(2);
    });

    it(`should return null if children dosen't exists`, async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const response = await workspaceRepository.getChildrensByPageId({
        workspaceId: objectIdToString(insertedId),
        pageReference: 'sample-page-9e1fac808a5f572',
      });

      expect(response).toBeNull();
    });
  });

  describe('GetUserById', () => {
    it('should return user if user exists', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const response = await workspaceRepository.getWorkspaceById(
        objectIdToString(insertedId)
      );

      expect(response).toBeTruthy();
    });

    it(`should return null if user dosen't exists`, async () => {
      const workspaceRepository = new WorkspaceRepository();

      const response = await workspaceRepository.getWorkspaceById(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it(`should return null if an invalid object-id is provided`, async () => {
      const workspaceRepository = new WorkspaceRepository();

      const response = await workspaceRepository.getWorkspaceById('invalid_id');

      expect(response).toBeNull();
    });
  });

  describe('UpdateWorkspace', () => {
    it('should update a workspace and return the updated workspace on success', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const newIcon = 'updated-sample-icon';
      const newName = 'updated-new-name';

      const updatedWorkspace = await workspaceRepository.updateWorkspace({
        workspaceId: objectIdToString(insertedId),
        workspaceData: {
          name: newName,
          icon: newIcon,
        },
      });

      expect(updatedWorkspace.name).toBe(newName);
      expect(updatedWorkspace.icon).toBe(newIcon);
    });
  });

  describe('RemoveMemberByWorkspaceId', () => {
    it('should remove member and return updated workspace', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members: [...members, 'remove-this-member'],
        pages,
      });

      const updatedWorkspace =
        await workspaceRepository.removeMemberByWorkspaceId({
          workspaceId: objectIdToString(insertedId),
          memberId: 'remove-this-member',
        });

      expect(updatedWorkspace.members).toHaveLength(1);
    });
  });

  describe('RemovePageByPageId', () => {
    it('should remove page from pages and return updated workspace', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      const updatedWorkspace = await workspaceRepository.removePageByPageId({
        workspaceId: objectIdToString(insertedId),
        pageId: 'sample-page-id-0',
      });

      expect(updatedWorkspace.pages).toHaveLength(4);
    });
  });

  describe('DeleteUser', () => {
    it('should delete a workspace on success', async () => {
      const workspaceRepository = new WorkspaceRepository();

      const { name, icon, members, pages } = mockWorkspace();

      const { insertedId } = await workspaceCollection.insertOne({
        name,
        icon,
        members,
        pages,
      });

      await workspaceRepository.deleteWorkspace(objectIdToString(insertedId));
      const count = await workspaceCollection.countDocuments();

      expect(count).toBe(0);
    });
  });
});
