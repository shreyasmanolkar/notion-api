import { DeleteUserInterface } from '@application/interfaces/use-cases/users/DeleteUserInterface';
import { DeleteUser } from '@application/use-cases/users/DeleteUser';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeDeleteUser = (): DeleteUserInterface => {
  const userRepository = new UserRepository();

  return new DeleteUser(userRepository);
};
