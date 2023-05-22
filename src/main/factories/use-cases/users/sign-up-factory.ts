import { SignUpInterface } from '@application/interfaces/use-cases/users/SignUpInterface';
import { SignUp } from '@application/use-cases/users/SignUp';
import { BcryptAdapter } from '@infrastructure/cryptography/BcryptAdapter';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';
import env from '@main/config/env';

export const makeSignUp = (): SignUpInterface => {
  const userRepository = new UserRepository();
  const bcryptAdapter = new BcryptAdapter(+env.bcryptSalt);

  return new SignUp(userRepository, userRepository, bcryptAdapter);
};
