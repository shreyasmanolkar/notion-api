import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { AuthorizationStub } from '@tests/application/mocks/pages/use-cases';
import { AuthorizationMiddleware } from '@infrastructure/http/middlewares/authorization/AuthorizationMiddleware';
import { ForbiddenError } from '@application/errors/ForbiddenError';
import { forbidden, ok } from '@infrastructure/http/helpers/http';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { pageId: 'sample-page-id' },
  userId: 'sample-user-id',
});

type SutTypes = {
  sut: AuthorizationMiddleware;
  authorizationStub: AuthorizationStub;
};

const makeSut = (): SutTypes => {
  const authorizationStub = new AuthorizationStub();
  const sut = new AuthorizationMiddleware(authorizationStub);
  return {
    sut,
    authorizationStub,
  };
};

describe('AuthorizationMiddleware', () => {
  it('should call Authorization with correct params', async () => {
    const { sut, authorizationStub } = makeSut();
    const executeSpy = jest.spyOn(authorizationStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(executeSpy).toHaveBeenCalledWith({
      userId: httpRequest.userId,
      pageId: httpRequest.params.pageId,
    });
  });

  it('should return 403 if Authenticate returns error', async () => {
    const { sut, authorizationStub } = makeSut();
    jest.spyOn(authorizationStub, 'execute').mockImplementation(async () => {
      return new PageNotFoundError();
    });
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(forbidden(new PageNotFoundError()));
  });

  it('should return 403 if Authenticate returns error', async () => {
    const { sut, authorizationStub } = makeSut();
    jest.spyOn(authorizationStub, 'execute').mockImplementation(async () => {
      return new ForbiddenError();
    });
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(forbidden(new PermissionError()));
  });

  it('should return 200 if Authenticate returns a decoded token', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(ok({ workspaceId: 'sample-workspace-id' }));
  });
});
