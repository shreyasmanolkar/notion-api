import { GetAccessTokenInterface } from '@application/interfaces/use-cases/users/GetAccessTokenInterface';
import { GetAccessToken } from '@application/use-cases/users/GetAccessToken';
import { TokenRepository } from '@infrastructure/db/mongodb/repositories/TokenRepository';
import { JWTAdapter } from '@infrastructure/cryptography/JWTAdapter';
import env from '@main/config/env';

export const makeGetAccessToken = (): GetAccessTokenInterface => {
  const tokenRepository = new TokenRepository();
  const jwtAdapter = new JWTAdapter(
    env.accessTokenSecret,
    env.refreshTokenSecret
  );

  return new GetAccessToken(tokenRepository, jwtAdapter, jwtAdapter);
};
