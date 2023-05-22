import { EmailInUseError } from '@application/errors/EmailInUseError';
import { HashGenerator } from '@application/interfaces/cryptography/HashGenerator';
import { CreateUserRepository } from '@application/interfaces/repositories/users/createUserRepository';
import { LoadUserByEmailRepository } from '@application/interfaces/repositories/users/loadUserByEmailRepository';
import { SignUpInterface } from '@application/interfaces/use-cases/users/SignUpInterface';

export class SignUp implements SignUpInterface {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(
    userData: SignUpInterface.Request
  ): Promise<SignUpInterface.Response> {
    const { email, password } = userData;
    const existingUser = await this.loadUserByEmailRepository.loadUserByEmail(
      email
    );

    if (existingUser) {
      return new EmailInUseError();
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = this.createUserRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }
}
