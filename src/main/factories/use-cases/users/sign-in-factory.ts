import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';
import { SignIn } from '@application/use-cases/users/SignIn';
import { BcryptAdapter } from '@infrastructure/cryptography/BcryptAdapter';
import { JWTAdapter } from '@infrastructure/cryptography/JWTAdapter';
import { TokenRepository } from '@infrastructure/db/mongodb/repositories/TokenRepository';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';
import env from '@main/config/env';

export const makeSignIn = (): SignInInterface => {
  const userRepository = new UserRepository();
  const tokenRepository = new TokenRepository();
  const bcryptAdapter = new BcryptAdapter(+env.bcryptSalt);
  const jwtAdapter = new JWTAdapter(
    env.accessTokenSecret,
    env.refreshTokenSecret
  );

  return new SignIn(userRepository, tokenRepository, bcryptAdapter, jwtAdapter);
};
