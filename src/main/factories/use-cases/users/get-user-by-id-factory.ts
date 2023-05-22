import { GetUserByIdInterface } from '@application/interfaces/use-cases/users/GetUserByIdInterface';
import { GetUserById } from '@application/use-cases/users/GetUserById';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeGetUserById = (): GetUserByIdInterface => {
  const userRepository = new UserRepository();

  return new GetUserById(userRepository);
};
