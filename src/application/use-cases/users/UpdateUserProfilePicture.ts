import { UpdateUserProfilePictureRepository } from '@application/interfaces/repositories/users/updateUserProfilePictureRepository';
import { UpdateUserProfilePictureInterface } from '@application/interfaces/use-cases/users/UpdateUserProfilePictureInterface';

export class UpdateUserProfilePicture
  implements UpdateUserProfilePictureInterface
{
  constructor(
    private readonly updateUserProfilePictureRepository: UpdateUserProfilePictureRepository
  ) {}

  async execute(
    params: UpdateUserProfilePictureInterface.Request
  ): Promise<UpdateUserProfilePictureInterface.Response> {
    const { userId, url } = params;

    await this.updateUserProfilePictureRepository.updateUserProfilePicture({
      userId,
      url,
    });
  }
}
