import { UpdateUserInterface } from '@application/interfaces/use-cases/users/UpdateUserInterface';
import { UpdateUser } from '@application/use-cases/users/UpdateUser';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeUpdateUser = (): UpdateUserInterface => {
  const userRepository = new UserRepository();

  return new UpdateUser(userRepository, userRepository);
};
