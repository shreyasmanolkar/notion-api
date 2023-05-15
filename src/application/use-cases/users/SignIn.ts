import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { HashComparer } from '@application/interfaces/cryptography/HashCompare';
import { JWTGenerator } from '@application/interfaces/cryptography/JWTGenerator';
import { LoadUserByEmailRepository } from '@application/interfaces/repositories/users/loadUserByEmailRepository';
import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';

export class SignIn implements SignInInterface {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtGenerator: JWTGenerator
  ) {}

  async execute(
    credentials: SignInInterface.Request
  ): Promise<SignInInterface.Response> {
    const { email, password } = credentials;
    const user = await this.loadUserByEmailRepository.loadUserByEmail(email);

    if (!user) {
      return new UnauthorizedError();
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return new UnauthorizedError();
    }

    return this.jwtGenerator.generate(user.id);
  }
}
