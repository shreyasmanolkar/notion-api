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
import { getPageOneContent } from '@infrastructure/util/getPageContent';

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

    const content = getPageOneContent();

    const workspace = {
      name: 'home-workspace',
      icon: '1f30e',
      members: [],
      pages: [],
    };

    const workspaceId = await this.createWorkspace.execute(workspace);

    const pageId = await this.createPage.execute({
      title: 'Chandrayaan-3 | चंद्रयान-३',
      icon: '1f680',
      coverPicture: {
        url: '/static/media/nasa_space_shuttle_columbia_and_sunrise.b623df337db2db60dcc0.jpg',
        verticalPosition: 0,
      },
      content,
      favorite: [],
      pageSettings: {
        font: 'san-serif',
        smallText: true,
        fullWidth: false,
        lock: true,
      },
      path: null,
      workspaceId,
    });

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return forbidden(pageOrError);
    }

    const { reference, path, icon, title, createdAt } = pageOrError;

    await this.addPage.execute({
      workspaceId,
      pageData: {
        id: pageId,
        reference,
        path,
        icon,
        title,
        createdAt,
      },
    });

    const workspaces = [
      {
        workspaceId,
        workspaceName: workspace.name,
        workspaceIcon: workspace.icon,
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
