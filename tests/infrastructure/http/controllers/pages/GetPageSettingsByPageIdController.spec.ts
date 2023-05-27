import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageSettingsByPageIdController } from '@infrastructure/http/controllers/pages/GetPageSettingsByPageIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  GetPageSettingsByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';

type SutTypes = {
  sut: GetPageSettingsByPageIdController;
  getPageByIdStub: GetPageByIdStub;
  getPageSettingsByPageIdStub: GetPageSettingsByPageIdStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdStub = new GetPageByIdStub();
  const getPageSettingsByPageIdStub = new GetPageSettingsByPageIdStub();
  const sut = new GetPageSettingsByPageIdController(
    getPageByIdStub,
    getPageSettingsByPageIdStub
  );

  return {
    sut,
    getPageByIdStub,
    getPageSettingsByPageIdStub,
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
    const { sut, getPageSettingsByPageIdStub } = makeSut();

    const getPageSettingsByPageIdSpy = jest.spyOn(
      getPageSettingsByPageIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getPageSettingsByPageIdSpy).toHaveBeenCalledWith(
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
