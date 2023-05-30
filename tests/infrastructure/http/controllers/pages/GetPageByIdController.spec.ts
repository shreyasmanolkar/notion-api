import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdController } from '@infrastructure/http/controllers/pages/GetPageByIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { GetPageByIdStub } from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';

type SutTypes = {
  sut: GetPageByIdController;
  getPageByIdStub: GetPageByIdStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdStub = new GetPageByIdStub();
  const sut = new GetPageByIdController(getPageByIdStub);

  return {
    getPageByIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockPage();
  return {
    params: {
      pageId: id,
    },
  };
};

describe('GetPageByIdController', () => {
  it('should call GetPageById with correct params', async () => {
    const { sut, getPageByIdStub } = makeSut();

    const getPageByIdSpy = jest.spyOn(getPageByIdStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getPageByIdSpy).toHaveBeenCalledWith(httpRequest.params.pageId);
  });

  it('should return 404 if page is not found', async () => {
    const { sut, getPageByIdStub } = makeSut();
    const httpRequest = makeFakeHttpRequest();

    jest.spyOn(getPageByIdStub, 'execute').mockImplementation(async () => {
      return new PageNotFoundError();
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(notFound(new PageNotFoundError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
