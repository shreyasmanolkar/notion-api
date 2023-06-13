import { InvalidPasswordError } from '@application/errors/InvalidPasswordError';
import { InvalidUserError } from '@application/errors/InvalidUserError';
import { HashComparer } from '@application/interfaces/cryptography/HashCompare';
import { JWTGenerator } from '@application/interfaces/cryptography/JWTGenerator';
import { CreateTokenRepository } from '@application/interfaces/repositories/tokens/createTokenRepository';
import { LoadUserByEmailRepository } from '@application/interfaces/repositories/users/loadUserByEmailRepository';
import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';

export class SignIn implements SignInInterface {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly createTokenRepository: CreateTokenRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtGenerator: JWTGenerator
  ) {}

  async execute(
    credentials: SignInInterface.Request
  ): Promise<SignInInterface.Response> {
    const { email, password } = credentials;
    const user = await this.loadUserByEmailRepository.loadUserByEmail(email);

    if (!user) {
      return new InvalidUserError();
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return new InvalidPasswordError();
    }

    const accessToken = await this.jwtGenerator.generateAccessToken(user.id);
    const refreshToken = await this.jwtGenerator.generateRefreshToken(user.id);

    await this.createTokenRepository.createToken(refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
