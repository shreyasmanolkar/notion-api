import { ForbiddenError } from '@application/errors/ForbiddenError';
import { JWTVerifier } from '@application/interfaces/cryptography/JWTVerifier';
import { AuthenticateInterface } from '@application/interfaces/use-cases/users/AuthenticateInterface';

export class Authenticate implements AuthenticateInterface {
  constructor(private readonly jwtVerifier: JWTVerifier) {}

  async execute(
    authenticationToken: AuthenticateInterface.Request
  ): Promise<AuthenticateInterface.Response> {
    const decodedToken = await this.jwtVerifier.verify(authenticationToken);
    if (!decodedToken) {
      return new ForbiddenError();
    }
    return decodedToken;
  }
}
