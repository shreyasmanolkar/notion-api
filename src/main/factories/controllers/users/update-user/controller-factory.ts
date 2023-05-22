import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdateUserController } from '@infrastructure/http/controllers/users/UpdateUserController';
import { makeUpdateUserValidation } from '@main/factories/controllers/users/update-user/validation-factory';
import { makeGetUserById } from '@main/factories/use-cases/users/get-user-by-id-factory';
import { makeUpdateUser } from '@main/factories/use-cases/users/update-user-factory';

export const makeUpdateUserController = (): BaseController => {
  const validation = makeUpdateUserValidation();
  const getUserByIdUseCase = makeGetUserById();
  const updateUserUseCase = makeUpdateUser();
  return new UpdateUserController(
    validation,
    getUserByIdUseCase,
    updateUserUseCase
  );
};
