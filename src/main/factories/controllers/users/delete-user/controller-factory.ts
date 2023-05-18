import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeleteUserController } from '@infrastructure/http/controllers/users/DeleteUserController';
import { makeDeleteUser } from '@main/factories/use-cases/users/delete-user-factory';

export const makeDeleteUserController = (): BaseController => {
  const deleteUserUseCase = makeDeleteUser();

  return new DeleteUserController(deleteUserUseCase);
};
