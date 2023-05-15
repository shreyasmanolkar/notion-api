import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace UpdateUserProfilePictureInterface {
  export type Request = string;
  export type Response = void;
}

export interface UpdateUserProfilePictureInterface
  extends UseCase<
    UpdateUserProfilePictureInterface.Request,
    UpdateUserProfilePictureInterface.Response
  > {
  execute(
    url: UpdateUserProfilePictureInterface.Request
  ): Promise<UpdateUserProfilePictureInterface.Response>;
}
