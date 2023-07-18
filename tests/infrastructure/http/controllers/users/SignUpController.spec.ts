import { EmailInUseError } from '@application/errors/EmailInUseError';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { SignUpController } from '@infrastructure/http/controllers/users/SignUpController';
import {
  conflict,
  forbidden,
  ok,
  unauthorized,
} from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  CreatePageStub,
  GetPageByIdStub,
} from '@tests/application/mocks/pages/use-cases';
import {
  SignInStub,
  SignUpStub,
} from '@tests/application/mocks/users/use-cases';
import {
  AddMemberByWorkspaceIdStub,
  AddPageStub,
  CreateWorkspaceStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockUser from '@tests/domain/mock-user';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: SignUpController;
  validationStub: ValidationStub;
  signInStub: SignInStub;
  signUpStub: SignUpStub;
  createWorkspaceStub: CreateWorkspaceStub;
  createPageStub: CreatePageStub;
  addMemberByWorkspaceIdStub: AddMemberByWorkspaceIdStub;
  addPageStub: AddPageStub;
  getPageByIdStub: GetPageByIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const signInStub = new SignInStub();
  const signUpStub = new SignUpStub();
  const createWorkspaceStub = new CreateWorkspaceStub();
  const createPageStub = new CreatePageStub();
  const addMemberByWorkspaceIdStub = new AddMemberByWorkspaceIdStub();
  const addPageStub = new AddPageStub();
  const getPageByIdStub = new GetPageByIdStub();

  const sut = new SignUpController(
    validationStub,
    signUpStub,
    signInStub,
    createWorkspaceStub,
    createPageStub,
    addMemberByWorkspaceIdStub,
    addPageStub,
    getPageByIdStub
  );

  return {
    sut,
    validationStub,
    signUpStub,
    signInStub,
    createWorkspaceStub,
    createPageStub,
    addMemberByWorkspaceIdStub,
    addPageStub,
    getPageByIdStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { email, password, name, isDarkMode, profilePicture } = mockUser();

  return {
    body: {
      name,
      email,
      password,
      isDarkMode,
      profilePicture,
    },
  };
};

describe('SignUpController', () => {
  it('should call SignUp with given params', async () => {
    const { sut, signUpStub } = makeSut();

    const signUpSpy = jest.spyOn(signUpStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(signUpSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ...httpRequest.body,
      })
    );
  });

  it('should call CreateWorkspace with given params', async () => {
    const { sut, createWorkspaceStub } = makeSut();

    const createWorkspaceSpy = jest.spyOn(createWorkspaceStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(createWorkspaceSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'home-workspace',
        icon: '1f30e',
        members: [],
        pages: [],
      })
    );
  });

  it('should call CreatePage with given params', async () => {
    const { sut, createPageStub } = makeSut();

    const createPageSpy = jest.spyOn(createPageStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(createPageSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Chandrayaan-3 | चंद्रयान-३',
        icon: '1f680',
        coverPicture: {
          url: '/static/media/nasa_space_shuttle_columbia_and_sunrise.b623df337db2db60dcc0.jpg',
          verticalPosition: 0,
        },
        favorite: [],
        pageSettings: {
          font: 'san-serif',
          smallText: true,
          fullWidth: true,
          lock: true,
        },
        path: null,
      })
    );
  });

  it('should call getPageById with given params', async () => {
    const { sut, getPageByIdStub } = makeSut();

    const getPageByIdSpy = jest.spyOn(getPageByIdStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getPageByIdSpy).toBeCalled();
  });

  it('should return 403 if page is not found', async () => {
    const { sut, getPageByIdStub } = makeSut();

    jest.spyOn(getPageByIdStub, 'execute').mockImplementation(async () => {
      return new PageNotFoundError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(forbidden(new PageNotFoundError()));
  });

  it('should call addPage with given params', async () => {
    const { sut, addPageStub } = makeSut();

    const addPageSpy = jest.spyOn(addPageStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addPageSpy).toBeCalled();
  });

  it('should call AddMemberByWorkspaceId with given params', async () => {
    const { sut, addMemberByWorkspaceIdStub } = makeSut();

    const addMemberByWorkspaceIdSpy = jest.spyOn(
      addMemberByWorkspaceIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addMemberByWorkspaceIdSpy).toBeCalled();
  });

  it('should return 409 if email is in use', async () => {
    const { sut, signUpStub } = makeSut();

    jest.spyOn(signUpStub, 'execute').mockImplementation(async () => {
      return new EmailInUseError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(conflict(new EmailInUseError()));
  });

  it('should return 403 if authentication fails', async () => {
    const { sut, signInStub } = makeSut();

    jest.spyOn(signInStub, 'execute').mockImplementation(async () => {
      return new UnauthorizedError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    const refreshCookie = {
      token: 'sample-refresh-token',
    };

    expect(httpResponse).toEqual(
      ok(
        {
          accessToken: 'sample-access-token',
        },
        refreshCookie
      )
    );
  });
});
