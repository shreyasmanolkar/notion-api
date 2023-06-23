import { Collection, SetFields } from 'mongodb';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import {
  isValidObjectId,
  mapDocument,
  objectIdToString,
  stringToObjectId,
} from '@infrastructure/db/mongodb/helpers/mapper';
import { CreateUserRepository } from '@application/interfaces/repositories/users/createUserRepository';
import { LoadUserByEmailRepository } from '@application/interfaces/repositories/users/loadUserByEmailRepository';
import { AddWorkspaceByUserIdRepository } from '@application/interfaces/repositories/users/addWorkspaceByUserIdRepository';
import { AddPageIdToFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/addPageIdToFavoritesByWorkspaceIdRepository';
import { GetUserByIdRepository } from '@application/interfaces/repositories/users/getUserByIdRepository';
import { GetWorkspacesByUserIdRepository } from '@application/interfaces/repositories/users/getWorkspacesByUserIdRepository';
import { GetFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/getFavoritesByWorkspaceIdRepository';
import { UpdateUserRepository } from '@application/interfaces/repositories/users/updateUserRepository';
import { UpdateUserProfilePictureRepository } from '@application/interfaces/repositories/users/updateUserProfilePictureRepository';
import { UpdateUserWorkspaceMetaDataByWorkspaceIdRepository } from '@application/interfaces/repositories/users/updateUserWorkspaceMetaDataByWorkspaceIdRepository';
import { RemoveWorkspaceByUserIdRepository } from '@application/interfaces/repositories/users/removeWorkspaceByUserIdRepository';
import { RemovePageIdFromFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/removePageIdFromFavoritesByWorkspaceIdRepository';
import { DeleteUserRepository } from '@application/interfaces/repositories/users/deleteUserRepository';

export class UserRepository
  implements
    CreateUserRepository,
    AddWorkspaceByUserIdRepository,
    AddPageIdToFavoritesByWorkspaceIdRepository,
    LoadUserByEmailRepository,
    GetUserByIdRepository,
    GetWorkspacesByUserIdRepository,
    GetFavoritesByWorkspaceIdRepository,
    UpdateUserRepository,
    UpdateUserProfilePictureRepository,
    UpdateUserWorkspaceMetaDataByWorkspaceIdRepository,
    RemoveWorkspaceByUserIdRepository,
    RemovePageIdFromFavoritesByWorkspaceIdRepository,
    DeleteUserRepository
{
  static async getCollection(): Promise<Collection> {
    return dbConnection.getCollection('users');
  }

  async createUser(
    userData: CreateUserRepository.Request
  ): Promise<CreateUserRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { insertedId } = await collection.insertOne({
      ...userData,
      createdAt: new Date(),
    });
    return objectIdToString(insertedId);
  }

  async addWorkspaceByUserId(
    params: AddWorkspaceByUserIdRepository.Request
  ): Promise<AddWorkspaceByUserIdRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, workspaceId, workspaceName, workspaceIcon } = params;
    const { value: rawUser } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(userId) },
      {
        $addToSet: {
          workspaces: {
            workspaceId,
            workspaceName,
            workspaceIcon,
            favorites: [],
          },
        },
      } as SetFields<Document>,
      { upsert: true, returnDocument: 'after' }
    );

    return rawUser && mapDocument(rawUser);
  }

  async addPageIdToFavoritesByWorkspaceId(
    params: AddPageIdToFavoritesByWorkspaceIdRepository.Request
  ): Promise<AddPageIdToFavoritesByWorkspaceIdRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, workspaceId, pageId } = params;
    const { value: rawUser } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(userId), 'workspaces.workspaceId': workspaceId },
      {
        $addToSet: { 'workspaces.$.favorites': pageId },
      } as SetFields<Document>,
      { upsert: true, returnDocument: 'after' }
    );

    return rawUser && mapDocument(rawUser);
  }

  async loadUserByEmail(
    email: LoadUserByEmailRepository.Request
  ): Promise<LoadUserByEmailRepository.Response> {
    const collection = await UserRepository.getCollection();
    const rawUser = await collection.findOne({ email });
    return rawUser && mapDocument(rawUser);
  }

  async getUserById(
    userId: GetUserByIdRepository.Request
  ): Promise<GetUserByIdRepository.Response> {
    if (!isValidObjectId(userId)) {
      return null;
    }

    const collection = await UserRepository.getCollection();
    const rawUser = await collection.findOne(
      {
        _id: stringToObjectId(userId),
      },
      { projection: { password: 0 } }
    );
    return rawUser && mapDocument(rawUser);
  }

  async getWorkspacesByUserId(
    userId: GetWorkspacesByUserIdRepository.Request
  ): Promise<GetWorkspacesByUserIdRepository.Response> {
    if (!isValidObjectId(userId)) {
      return null;
    }

    const collection = await UserRepository.getCollection();
    const rawWorkspaces = await collection.findOne(
      {
        _id: stringToObjectId(userId),
      },
      {
        projection: { workspaces: 1 },
      }
    );

    if (rawWorkspaces) {
      return rawWorkspaces.workspaces;
    }

    return null;
  }

  async getFavoritesByWorkspaceId(
    params: GetFavoritesByWorkspaceIdRepository.Request
  ): Promise<GetFavoritesByWorkspaceIdRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, workspaceId } = params;
    const rawFavorites = await collection.findOne(
      {
        _id: stringToObjectId(userId),
        'workspaces.workspaceId': workspaceId,
      },
      { projection: { 'workspaces.$': 1 } }
    );

    if (rawFavorites && rawFavorites.workspaces[0]) {
      return rawFavorites.workspaces[0].favorites;
    }

    return null;
  }

  async updateUser(
    params: UpdateUserRepository.Request
  ): Promise<UpdateUserRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, userData } = params;
    const { value: rawUser } = await collection.findOneAndUpdate(
      {
        _id: stringToObjectId(userId),
      },
      { $set: { ...userData, updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );

    return rawUser && mapDocument(rawUser);
  }

  async updateUserProfilePicture(
    params: UpdateUserProfilePictureRepository.Request
  ): Promise<UpdateUserProfilePictureRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, url } = params;

    const { value: rawUser } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(userId) },
      { $set: { profilePicture: { url } } },
      { upsert: true, returnDocument: 'after' }
    );

    return rawUser && mapDocument(rawUser);
  }

  async updateUserWorkspaceMetaDataByWorkspaceId(
    params: UpdateUserWorkspaceMetaDataByWorkspaceIdRepository.Request
  ): Promise<UpdateUserWorkspaceMetaDataByWorkspaceIdRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, workspaceId, workspaceData } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedFields: Record<string, any> = {};

    if (workspaceData.workspaceName) {
      updatedFields['workspaces.$.workspaceName'] = workspaceData.workspaceName;
    }

    if (workspaceData.workspaceIcon) {
      updatedFields['workspaces.$.workspaceIcon'] = workspaceData.workspaceIcon;
    }

    await collection.updateOne(
      { _id: stringToObjectId(userId), 'workspaces.workspaceId': workspaceId },
      { $set: updatedFields }
    );
  }

  async removeWorkspaceByUserId(
    params: RemoveWorkspaceByUserIdRepository.Request
  ): Promise<RemoveWorkspaceByUserIdRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, workspaceId } = params;

    const { value: rawUser } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(userId) },
      { $pull: { workspaces: { workspaceId } } } as SetFields<Document>,
      { returnDocument: 'after' }
    );
    return rawUser && mapDocument(rawUser);
  }

  async removePageIdFromFavoritesByWorkspaceId(
    params: RemovePageIdFromFavoritesByWorkspaceIdRepository.Request
  ): Promise<RemovePageIdFromFavoritesByWorkspaceIdRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { userId, workspaceId, pageId } = params;
    const { value: rawUser } = await collection.findOneAndUpdate(
      {
        _id: stringToObjectId(userId),
        'workspaces.workspaceId': workspaceId,
      },
      {
        $pull: { 'workspaces.$.favorites': pageId },
      } as SetFields<Document>,
      { returnDocument: 'after' }
    );

    return rawUser && mapDocument(rawUser);
  }

  async deleteUser(
    userId: DeleteUserRepository.Request
  ): Promise<DeleteUserRepository.Response> {
    const collection = await UserRepository.getCollection();
    await collection.deleteOne({ _id: stringToObjectId(userId) });
  }
}
