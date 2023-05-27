import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageContentByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageContentByPageIdController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  UpdatePageContentByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdatePageContentByPageIdController;
  validationStub: ValidationStub;
  getPageByIdStub: GetPageByIdStub;
  updatePageContentByPageIdStub: UpdatePageContentByPageIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getPageByIdStub = new GetPageByIdStub();
  const updatePageContentByPageIdStub = new UpdatePageContentByPageIdStub();
  const sut = new UpdatePageContentByPageIdController(
    validationStub,
    getPageByIdStub,
    updatePageContentByPageIdStub
  );
  return {
    sut,
    getPageByIdStub,
    updatePageContentByPageIdStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id, content } = mockPage();
  return {
    params: {
      pageId: id,
    },
    body: {
      content,
    },
  };
};

describe('UpdateUserController', () => {
  it('should call updateUser with correct params', async () => {
    const { sut, updatePageContentByPageIdStub } = makeSut();
    const updatePageContentByPageIdSpy = jest.spyOn(
      updatePageContentByPageIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updatePageContentByPageIdSpy).toHaveBeenCalledWith({
      pageId: httpRequest.params.pageId,
      content: httpRequest.body.content,
    });
  });

  it('should return 404 if GetUserById returns a UserNotFoundError', async () => {
    const { sut, getPageByIdStub } = makeSut();
    jest
      .spyOn(getPageByIdStub, 'execute')
      .mockImplementation(async () => new PageNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new PageNotFoundError()));
  });

  it('should return 404 if UpdatePage returns a UserNotFoundError', async () => {
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
