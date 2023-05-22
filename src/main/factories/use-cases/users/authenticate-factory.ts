import { AuthenticateInterface } from '@application/interfaces/use-cases/users/AuthenticateInterface';
import { Authenticate } from '@application/use-cases/users/Authenticate';
import { JWTAdapter } from '@infrastructure/cryptography/JWTAdapter';
import env from '@main/config/env';

export const makeAuthenticate = (): AuthenticateInterface => {
  const jwtAdapter = new JWTAdapter(
    env.accessTokenSecret,
    env.refreshTokenSecret
  );
  return new Authenticate(jwtAdapter);
};
