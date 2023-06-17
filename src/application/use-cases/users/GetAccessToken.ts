import { ForbiddenError } from '@application/errors/ForbiddenError';
import { InvalidTokenError } from '@application/errors/InvalidTokenError';
import { JWTGenerator } from '@application/interfaces/cryptography/JWTGenerator';
import { JWTVerifier } from '@application/interfaces/cryptography/JWTVerifier';
import { GetTokenRepository } from '@application/interfaces/repositories/tokens/getTokenRepository';
import { GetAccessTokenInterface } from '@application/interfaces/use-cases/users/GetAccessTokenInterface';

export class GetAccessToken implements GetAccessTokenInterface {
  constructor(
    private readonly getTokenRepository: GetTokenRepository,
    private readonly jwtVerifier: JWTVerifier,
    private readonly jwtGenerator: JWTGenerator
  ) {}

  async execute(
    token: GetAccessTokenInterface.Request
  ): Promise<GetAccessTokenInterface.Response> {
    const storedToken = await this.getTokenRepository.getToken(token);

    if (!storedToken) {
      return new InvalidTokenError();
    }

    const decodedToken = await this.jwtVerifier.verifyRefreshToken(token);

    if (!decodedToken) {
      return new ForbiddenError();
    }

    const stringifyDecodedToken = JSON.stringify(decodedToken);
    const parsedDecodedToken = JSON.parse(stringifyDecodedToken);

    const accessToken = await this.jwtGenerator.generateAccessToken(
      parsedDecodedToken.userId
    );

    return {
      accessToken,
    };
  }
}
