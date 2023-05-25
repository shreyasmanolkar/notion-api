import { EmailInUseError } from '@application/errors/EmailInUseError';
import { SignUpInterface } from '@application/interfaces/use-cases/users/SignUpInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';
import { forbidden, ok, unauthorized } from '@infrastructure/http/helpers/http';
import { CreateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/CreateWorkspaceInterface';
import { AddMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/AddMemberByWorkspaceIdInterface';

export namespace SignUpController {
  export type Request = HttpRequest<SignUpInterface.Request>;
  export type Response = HttpResponse<
    { accessToken: string } | EmailInUseError
  >;
}

export class SignUpController extends BaseController {
  constructor(
    private readonly signUpValidation: Validation,
    private readonly signUp: SignUpInterface,
    private readonly signIn: SignInInterface,
    private readonly createWorkspace: CreateWorkspaceInterface,
    private readonly addMemberByWorkspaceId: AddMemberByWorkspaceIdInterface
  ) {
    super(signUpValidation);
  }

  async execute(
    httpRequest: SignUpController.Request
  ): Promise<SignUpController.Response> {
    const { name, email, password, isDarkMode, profilePicture } =
      httpRequest.body!;

    // TODO: create new page and provide it's id , reference, icon and path in workspaces

    const workspaceId = await this.createWorkspace.execute({
      name: 'home-workspace',
      icon: '1F3C7',
      members: [],
      pages: [
        {
          id: Date.now().toString(),
          reference: `introduction-09871237456`,
          icon: '1F607',
          path: null,
        },
      ],
    });

    const workspaces = [
      {
        workspaceId,
        favorites: [],
      },
    ];

    const idOrError = await this.signUp.execute({
      name,
      email,
      password,
      isDarkMode,
      profilePicture,
      workspaces,
    });

    if (idOrError instanceof EmailInUseError) {
      return forbidden(idOrError);
    }

    await this.addMemberByWorkspaceId.execute({
      workspaceId,
      memberId: idOrError,
    });

    const authenticationTokensOrError = await this.signIn.execute({
      email,
      password,
    });

    if (authenticationTokensOrError instanceof Error) {
      return unauthorized(authenticationTokensOrError);
    }

    const { accessToken, refreshToken } = authenticationTokensOrError;

    const refreshCookie = {
      token: refreshToken,
    };

    return ok(
      {
        accessToken,
      },
      refreshCookie
    );
  }
}
