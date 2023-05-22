import { CreateTokenRepository } from '@application/interfaces/repositories/tokens/createTokenRepository';
import { DeleteTokenRepository } from '@application/interfaces/repositories/tokens/deleteTokenRepository';
import { GetTokenRepository } from '@application/interfaces/repositories/tokens/getTokenRepository';
import { Collection } from 'mongodb';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import {
  mapDocument,
  objectIdToString,
} from '@infrastructure/db/mongodb/helpers/mapper';

export class TokenRepository
  implements CreateTokenRepository, GetTokenRepository, DeleteTokenRepository
{
  static async getCollection(): Promise<Collection> {
    return dbConnection.getCollection('tokens');
  }

  async createToken(
    token: CreateTokenRepository.Request
  ): Promise<CreateTokenRepository.Response> {
    const collection = await TokenRepository.getCollection();
    const { insertedId } = await collection.insertOne({
      token,
      createdAt: new Date(),
    });
    return objectIdToString(insertedId);
  }

  async getToken(
    token: GetTokenRepository.Request
  ): Promise<GetTokenRepository.Response> {
    const collection = await TokenRepository.getCollection();
    const rawToken = await collection.findOne({
      token,
    });

    if (rawToken) {
      return mapDocument(rawToken);
    }

    return null;
  }

  async deleteToken(
    token: DeleteTokenRepository.Request
  ): Promise<DeleteTokenRepository.Response> {
    const collection = await TokenRepository.getCollection();
    await collection.deleteOne({ token });
  }
}
