import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetUserByIdController } from '@infrastructure/http/controllers/users/GetUserByIdController';
import { makeGetUserById } from '@main/factories/use-cases/users/get-user-by-id-factory';

export const makeGetUserByIdController = (): BaseController => {
  const getUserByIdUseCase = makeGetUserById();

  return new GetUserByIdController(getUserByIdUseCase);
};
