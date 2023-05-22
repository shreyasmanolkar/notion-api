/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateTokenRepository } from '@application/interfaces/repositories/tokens/createTokenRepository';
import { DeleteTokenRepository } from '@application/interfaces/repositories/tokens/deleteTokenRepository';
import { GetTokenRepository } from '@application/interfaces/repositories/tokens/getTokenRepository';

export class CreateTokenRepositoryStub implements CreateTokenRepository {
  async createToken(
    _token: CreateTokenRepository.Request
  ): Promise<CreateTokenRepository.Response> {
    return 'sample-id';
  }
}

export class GetTokenRepositoryStub implements GetTokenRepository {
  async getToken(
    _token: GetTokenRepository.Request
  ): Promise<GetTokenRepository.Response> {
    return {
      _id: 'sample-id',
      token: 'sample-token',
      createdAt: new Date(),
    };
  }
}

export class DeleteTokenRepositoryStub implements DeleteTokenRepository {
  async deleteToken(
    _token: DeleteTokenRepository.Request
  ): Promise<DeleteTokenRepository.Response> {}
}
