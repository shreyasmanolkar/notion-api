import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { SignUpController } from '@infrastructure/http/controllers/users/SignUpController';
import { makeSignUpValidation } from '@main/factories/controllers/users/sign-up/validation-factory';
import { makeSignIn } from '@main/factories/use-cases/users/sign-in-factory';
import { makeSignUp } from '@main/factories/use-cases/users/sign-up-factory';

export const makeSignUpController = (): BaseController => {
  const validation = makeSignUpValidation();
  const signUpUseCase = makeSignUp();
  const signInUseCase = makeSignIn();

  return new SignUpController(validation, signUpUseCase, signInUseCase);
};
