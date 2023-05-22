import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { SignInController } from '@infrastructure/http/controllers/users/SignInController';
import { makeSignInValidation } from '@main/factories/controllers/users/sign-in/validation-factory';
import { makeSignIn } from '@main/factories/use-cases/users/sign-in-factory';

export const makeSignInController = (): BaseController => {
  const validation = makeSignInValidation();
  const useCase = makeSignIn();

  return new SignInController(validation, useCase);
};
