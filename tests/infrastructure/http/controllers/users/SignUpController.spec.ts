import { EmailInUseError } from '@application/errors/EmailInUseError';
import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { SignUpController } from '@infrastructure/http/controllers/users/SignUpController';
import { forbidden, ok, unauthorized } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  SignInStub,
  SignUpStub,
} from '@tests/application/mocks/users/use-cases';
import {
  AddMemberByWorkspaceIdStub,
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
  addMemberByWorkspaceIdStub: AddMemberByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const signInStub = new SignInStub();
  const signUpStub = new SignUpStub();
  const createWorkspaceStub = new CreateWorkspaceStub();
  const addMemberByWorkspaceIdStub = new AddMemberByWorkspaceIdStub();
  const sut = new SignUpController(
    validationStub,
    signUpStub,
    signInStub,
    createWorkspaceStub,
    addMemberByWorkspaceIdStub
  );

  return {
    sut,
    validationStub,
    signUpStub,
    signInStub,
    createWorkspaceStub,
    addMemberByWorkspaceIdStub,
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
      })
    );
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

  it('should return 403 if email is in use', async () => {
    const { sut, signUpStub } = makeSut();

    jest.spyOn(signUpStub, 'execute').mockImplementation(async () => {
      return new EmailInUseError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
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
