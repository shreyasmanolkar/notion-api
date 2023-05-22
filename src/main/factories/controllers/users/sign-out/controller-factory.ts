import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { SignOutController } from '@infrastructure/http/controllers/users/SignOutController';
import { makeSignOut } from '@main/factories/use-cases/users/sign-out-factory';

export const makeSignOutController = (): BaseController => {
  const useCase = makeSignOut();

  return new SignOutController(useCase);
};
