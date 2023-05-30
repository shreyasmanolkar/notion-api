import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageContentByPageIdController } from '@infrastructure/http/controllers/pages/GetPageContentByPageIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  GetPageContentByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';

type SutTypes = {
  sut: GetPageContentByPageIdController;
  getPageByIdStub: GetPageByIdStub;
  getPageContentByPageIdStub: GetPageContentByPageIdStub;
};

const makeSut = (): SutTypes => {
  const getPageContentByPageIdStub = new GetPageContentByPageIdStub();
  const getPageByIdStub = new GetPageByIdStub();
  const sut = new GetPageContentByPageIdController(
    getPageByIdStub,
    getPageContentByPageIdStub
  );

  return {
    sut,
    getPageByIdStub,
    getPageContentByPageIdStub,
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

describe('GetPageContentByPageIdController', () => {
  it('should call GetPageContentByPageId with correct params', async () => {
    const { sut, getPageContentByPageIdStub } = makeSut();

    const getPageContentByPageIdSpy = jest.spyOn(
      getPageContentByPageIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getPageContentByPageIdSpy).toHaveBeenCalledWith(
      httpRequest.params.pageId
    );
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
