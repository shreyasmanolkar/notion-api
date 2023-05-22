import { User } from '@domain/entities/User';

export namespace UpdateUserProfilePictureRepository {
  export type Request = { userId: string; url: string };
  export type Response = User;
}

export interface UpdateUserProfilePictureRepository {
  updateUserProfilePicture(
    params: UpdateUserProfilePictureRepository.Request
  ): Promise<UpdateUserProfilePictureRepository.Response>;
}
