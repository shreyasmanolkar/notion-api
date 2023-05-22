import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { MiddlewareStub } from '@tests/infrastructure/mocks/middlewares';
import { serverError } from '@infrastructure/http/helpers/http';

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: { authorization: 'Bearer any_token' },
});

describe('BaseMiddleware', () => {
  it('should call the execute method with correct params', async () => {
    const middlewareStub = new MiddlewareStub();
    const executeSpy = jest.spyOn(middlewareStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await middlewareStub.handle(httpRequest);
    expect(executeSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('should return the same response as the execute method', async () => {
    const middlewareStub = new MiddlewareStub();
    const executeHttpResponse = await middlewareStub.execute({});
    const httpResponse = await middlewareStub.handle({});
    expect(httpResponse).toEqual(executeHttpResponse);
  });

  it('should return 500 if the execute method throws', async () => {
    const middlewareStub = new MiddlewareStub();
    jest.spyOn(middlewareStub, 'execute').mockImplementationOnce(async () => {
      throw new Error('any_error');
    });
    const httpResponse = await middlewareStub.handle({});
    expect(httpResponse).toEqual(serverError(new Error('any_error')));
  });
});
