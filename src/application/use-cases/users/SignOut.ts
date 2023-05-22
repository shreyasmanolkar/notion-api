import { DeleteTokenRepository } from '@application/interfaces/repositories/tokens/deleteTokenRepository';
import { SignOutInterface } from '@application/interfaces/use-cases/users/SignOutInterface';

export class SignOut implements SignOutInterface {
  constructor(private readonly deleteTokenRepository: DeleteTokenRepository) {}

  async execute(
    token: SignOutInterface.Request
  ): Promise<SignOutInterface.Response> {
    await this.deleteTokenRepository.deleteToken(token);
  }
}
