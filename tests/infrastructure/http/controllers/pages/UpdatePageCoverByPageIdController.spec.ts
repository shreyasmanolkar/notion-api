import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageCoverByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageCoverByPageIdController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  UpdatePageCoverByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdatePageCoverByPageIdController;
  validationStub: ValidationStub;
  getPageByIdStub: GetPageByIdStub;
  updatePageCoverByPageIdStub: UpdatePageCoverByPageIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getPageByIdStub = new GetPageByIdStub();
  const updatePageCoverByPageIdStub = new UpdatePageCoverByPageIdStub();
  const sut = new UpdatePageCoverByPageIdController(
    validationStub,
    getPageByIdStub,
    updatePageCoverByPageIdStub
  );
  return {
    sut,
    getPageByIdStub,
    updatePageCoverByPageIdStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id, coverPicture } = mockPage();
  return {
    params: {
      pageId: id,
    },
    body: {
      url: coverPicture.url,
    },
  };
};

describe('UpdatePageCoverByPageIdController', () => {
  it('should call UpdatePageCoverByPageId with correct params', async () => {
    const { sut, updatePageCoverByPageIdStub } = makeSut();
    const updatePageCoverByPageIdSpy = jest.spyOn(
      updatePageCoverByPageIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updatePageCoverByPageIdSpy).toHaveBeenCalledWith({
      pageId: httpRequest.params.pageId,
      url: httpRequest.body.url,
    });
  });

  it('should return 404 if GetPageById returns a UserNotFoundError', async () => {
    const { sut, getPageByIdStub } = makeSut();
    jest
      .spyOn(getPageByIdStub, 'execute')
      .mockImplementation(async () => new PageNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new PageNotFoundError()));
  });

  it('should return 404 if UpdatePage returns a PageNotFoundError', async () => {
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
