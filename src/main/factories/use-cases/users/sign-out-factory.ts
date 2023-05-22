import { SignOutInterface } from '@application/interfaces/use-cases/users/SignOutInterface';
import { SignOut } from '@application/use-cases/users/SignOut';
import { TokenRepository } from '@infrastructure/db/mongodb/repositories/TokenRepository';

export const makeSignOut = (): SignOutInterface => {
  const tokenRepository = new TokenRepository();

  return new SignOut(tokenRepository);
};
