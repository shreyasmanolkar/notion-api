import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageTitleByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageTitleByPageIdController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  UpdatePageTitleByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdatePageTitleByPageIdController;
  validationStub: ValidationStub;
  getPageByIdStub: GetPageByIdStub;
  updatePageTitleByPageIdStub: UpdatePageTitleByPageIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getPageByIdStub = new GetPageByIdStub();
  const updatePageTitleByPageIdStub = new UpdatePageTitleByPageIdStub();
  const sut = new UpdatePageTitleByPageIdController(
    validationStub,
    getPageByIdStub,
    updatePageTitleByPageIdStub
  );
  return {
    sut,
    getPageByIdStub,
    updatePageTitleByPageIdStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id, title } = mockPage();
  return {
    params: {
      pageId: id,
    },
    body: {
      title,
    },
  };
};

describe('UpdatePageTitleByPageIdController', () => {
  it('should call UpdatePageTitleByPageId with correct params', async () => {
    const { sut, updatePageTitleByPageIdStub } = makeSut();
    const updatePageTitleByPageIdSpy = jest.spyOn(
      updatePageTitleByPageIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updatePageTitleByPageIdSpy).toHaveBeenCalledWith({
      pageId: httpRequest.params.pageId,
      title: httpRequest.body.title,
    });
  });

  it('should return 404 if GetPageById returns a PageNotFoundError', async () => {
    const { sut, getPageByIdStub } = makeSut();
    jest
      .spyOn(getPageByIdStub, 'execute')
      .mockImplementation(async () => new PageNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new PageNotFoundError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
