import { Collection } from 'mongodb';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import env from '@main/config/env';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';
import mockUser from '@tests/domain/mock-user';
import { objectIdToString } from '@infrastructure/db/mongodb/helpers/mapper';

describe('User Repository', () => {
  let userCollection: Collection;

  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  beforeEach(async () => {
    userCollection = await UserRepository.getCollection();
    await userCollection.deleteMany({});
  });

  describe('CreateUser', () => {
    it('should create a new user and return an id on success', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const response = await userRepository.createUser({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const count = await userCollection.countDocuments();

      expect(response).toBeTruthy();
      expect(count).toBe(1);
    });
  });

  describe('AddWorkspaceByUserId', () => {
    it('should add provided workspaceId in users workspaces along with favorites, worksapaceIcon and WorkspaceName and return user', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const workspaceId = 'sample-workspaceId-2';
      const workspaceName = 'sample-workspace';
      const workspaceIcon = 'ICON';

      const updatedUser = await userRepository.addWorkspaceByUserId({
        userId: objectIdToString(insertedId),
        workspaceId,
        workspaceName,
        workspaceIcon,
      });

      expect(updatedUser.workspaces).toHaveLength(2);
      expect(updatedUser.workspaces[1].favorites).toHaveLength(0);
    });
  });

  describe('AddPageIdToFavoritesByWorkspaceId', () => {
    it('should add pageId to favorites by userId and return updated user', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const { workspaceId } = workspaces[0];
      const pageId = 'sample-page-2';

      const updatedUser =
        await userRepository.addPageIdToFavoritesByWorkspaceId({
          userId: objectIdToString(insertedId),
          workspaceId,
          pageId,
        });

      expect(updatedUser.workspaces[0].favorites).toHaveLength(2);
      expect(updatedUser.workspaces[0].favorites[1]).toBe(pageId);
    });
  });

  describe('LoadUserByEmail', () => {
    it('should return user by email', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const user = await userRepository.loadUserByEmail(email);

      expect(user).toBeTruthy();
    });
  });

  describe('GetUserById', () => {
    it('should return user if user exists', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const response = await userRepository.getUserById(
        objectIdToString(insertedId)
      );

      expect(response).toBeTruthy();
    });

    it(`should return null if user dosen't exists`, async () => {
      const userRepository = new UserRepository();
      const response = await userRepository.getUserById(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it(`should return null if an invalid object-id is provided`, async () => {
      const userRepository = new UserRepository();
      const response = await userRepository.getUserById('invalid_id');

      expect(response).toBeNull();
    });
  });

  describe('GetWorkspacesByUserId', () => {
    it('should return all workspaces by userId', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const allWorkspaces = await userRepository.getWorkspacesByUserId(
        objectIdToString(insertedId)
      );

      expect(allWorkspaces).toHaveLength(1);
    });

    it(`should return null if workspace doesn't exist`, async () => {
      const userRepository = new UserRepository();
      const response = await userRepository.getWorkspacesByUserId(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });

    it('should return null if invalid userId is provided', async () => {
      const userRepository = new UserRepository();
      const response = await userRepository.getWorkspacesByUserId(
        'invalid_uiserId'
      );

      expect(response).toBeNull();
    });
  });

  describe('GetFavoritesByWorkspaceId', () => {
    it('should return favorites from workspace queried by userId and workspaceId', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const { workspaceId } = workspaces[0];

      const favorites = await userRepository.getFavoritesByWorkspaceId({
        userId: objectIdToString(insertedId),
        workspaceId,
      });

      expect(favorites).toHaveLength(1);
    });

    it('should return null if invalid workspaceId is provided', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const response = await userRepository.getFavoritesByWorkspaceId({
        userId: objectIdToString(insertedId),
        workspaceId: 'invalid_uiserId',
      });

      expect(response).toBeNull();
    });
  });

  describe('UpdateUser', () => {
    it('should update a user and return the updated user on success', async () => {
      const userRepository = new UserRepository();
      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const newName = 'new-sample-name';
      const newEmail = 'new@sample.email';

      const updatedUser = await userRepository.updateUser({
        userId: objectIdToString(insertedId),
        userData: {
          name: newName,
          email: newEmail,
        },
      });

      expect(updatedUser.name).toBe(newName);
      expect(updatedUser.email).toBe(newEmail);
    });
  });

  describe('UpdateUserProfilePicture', () => {
    it('should updated user profile picture and return updated user', async () => {
      const userRepository = new UserRepository();
      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const newUrl = 'http://new-sample-url.com';

      const updatedUser = await userRepository.updateUserProfilePicture({
        userId: objectIdToString(insertedId),
        url: newUrl,
      });

      expect(updatedUser.profilePicture.url).toBe(newUrl);
    });
  });

  describe('updateUserWorkspaceMetaDataByWorkspaceId', () => {
    it('should updated workspace meta data and return void', async () => {
      const userRepository = new UserRepository();
      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const { workspaceId } = workspaces[0];
      const workspaceData = {
        workspaceName: 'sample-second-workspace',
      };

      await userRepository.updateUserWorkspaceMetaDataByWorkspaceId({
        userId: objectIdToString(insertedId),
        workspaceId,
        workspaceData,
      });

      const updatedUser = await userCollection.findOne({
        _id: insertedId,
      });

      expect(updatedUser?.workspaces[0].workspaceName).toBe(
        workspaceData.workspaceName
      );
    });
  });

  describe('RemoveWorkspaceByUserId', () => {
    it('should remove workspace and return updated user', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const { workspaceId } = workspaces[0];

      const updatedUser = await userRepository.removeWorkspaceByUserId({
        userId: objectIdToString(insertedId),
        workspaceId,
      });

      expect(updatedUser.workspaces).toHaveLength(0);
    });
  });

  describe('RemovePageIdFromFavoritesByWorkspaceId', () => {
    it('should remove pageId from workspaces favourites and return updated user', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      const { workspaceId } = workspaces[0];
      const pageId = workspaces[0].favorites[0];

      const updatedUser =
        await userRepository.removePageIdFromFavoritesByWorkspaceId({
          userId: objectIdToString(insertedId),
          workspaceId,
          pageId,
        });

      expect(updatedUser.workspaces[0].favorites).toHaveLength(0);
    });
  });

  describe('DeleteUser', () => {
    it('should delete a user on success', async () => {
      const userRepository = new UserRepository();

      const { name, email, password, isDarkMode, profilePicture, workspaces } =
        mockUser();

      const { insertedId } = await userCollection.insertOne({
        name,
        email,
        password,
        isDarkMode,
        profilePicture,
        workspaces,
      });

      await userRepository.deleteUser(objectIdToString(insertedId));
      const count = await userCollection.countDocuments();

      expect(count).toBe(0);
    });
  });
});
