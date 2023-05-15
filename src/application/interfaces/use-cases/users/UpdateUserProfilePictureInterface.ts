import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace UpdateUserProfilePictureInterface {
  export type Request = {
    userId: string;
    url: string;
  };
  export type Response = void;
}

export interface UpdateUserProfilePictureInterface
  extends UseCase<
    UpdateUserProfilePictureInterface.Request,
    UpdateUserProfilePictureInterface.Response
  > {
  execute(
    params: UpdateUserProfilePictureInterface.Request
  ): Promise<UpdateUserProfilePictureInterface.Response>;
}
