import { User } from '@domain/entities/User';

export namespace GetUserByIdRepository {
  export type Request = string;
  export type Response = User | null;
}

export interface GetUserByIdRepository {
  getUserById(
    userId: GetUserByIdRepository.Request
  ): Promise<GetUserByIdRepository.Response>;
}
