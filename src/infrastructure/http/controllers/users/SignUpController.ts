import { EmailInUseError } from '@application/errors/EmailInUseError';
import { SignUpInterface } from '@application/interfaces/use-cases/users/SignUpInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';
import {
  conflict,
  forbidden,
  ok,
  unauthorized,
} from '@infrastructure/http/helpers/http';
import { CreateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/CreateWorkspaceInterface';
import { AddMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/AddMemberByWorkspaceIdInterface';
import { CreatePageInterface } from '@application/interfaces/use-cases/pages/createPageInterface';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { AddPageInterface } from '@application/interfaces/use-cases/workspaces/AddPageInterface';

export namespace SignUpController {
  export type Request = HttpRequest<SignUpInterface.Request>;
  export type Response = HttpResponse<
    { accessToken: string } | EmailInUseError | PageNotFoundError
  >;
}

export class SignUpController extends BaseController {
  constructor(
    private readonly signUpValidation: Validation,
    private readonly signUp: SignUpInterface,
    private readonly signIn: SignInInterface,
    private readonly createWorkspace: CreateWorkspaceInterface,
    private readonly createPage: CreatePageInterface,
    private readonly addMemberByWorkspaceId: AddMemberByWorkspaceIdInterface,
    private readonly addPage: AddPageInterface,
    private readonly getPageById: GetPageByIdInterface
  ) {
    super(signUpValidation);
  }

  async execute(
    httpRequest: SignUpController.Request
  ): Promise<SignUpController.Response> {
    const { name, email, password, isDarkMode, profilePicture } =
      httpRequest.body!;

    const workspaceId = await this.createWorkspace.execute({
      name: 'home-workspace',
      icon: '1F3C7',
      members: [],
      pages: [],
    });

    const pageId = await this.createPage.execute({
      title: 'notion clone project',
      icon: '1F575',
      coverPicture: {
        url: 'http://cover-picture.com',
      },
      content: {
        type: 'doc',
        content: [
          {
            type: 'dBlock',
            content: [
              {
                type: 'heading',
                attrs: {
                  level: 1,
                },
                content: [
                  {
                    type: 'text',
                    text: 'About Notion Clone Project',
                  },
                ],
              },
            ],
          },
        ],
      },
      favorite: [],
      pageSettings: {
        font: 'serif',
        smallText: true,
        fullWidth: true,
        lock: false,
      },
      path: null,
      workspaceId,
    });

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return forbidden(pageOrError);
    }

    const { reference, path, icon } = pageOrError;

    await this.addPage.execute({
      workspaceId,
      pageData: {
        id: pageId,
        reference,
        path,
        icon,
      },
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
      return conflict(idOrError);
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
