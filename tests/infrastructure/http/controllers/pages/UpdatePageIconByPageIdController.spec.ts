import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageIconByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageIconByPageIdController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  UpdatePageIconByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import { UpdateWorkspacePagesMetaDataByPageIdStub } from '@tests/application/mocks/workspaces/use-cases';
import mockPage from '@tests/domain/mock-page';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdatePageIconByPageIdController;
  validationStub: ValidationStub;
  getPageByIdStub: GetPageByIdStub;
  updatePageIconByPageIdStub: UpdatePageIconByPageIdStub;
  updateWorkspacePagesMetaDataByPageIdStub: UpdateWorkspacePagesMetaDataByPageIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getPageByIdStub = new GetPageByIdStub();
  const updatePageIconByPageIdStub = new UpdatePageIconByPageIdStub();
  const updateWorkspacePagesMetaDataByPageIdStub =
    new UpdateWorkspacePagesMetaDataByPageIdStub();

  const sut = new UpdatePageIconByPageIdController(
    validationStub,
    getPageByIdStub,
    updatePageIconByPageIdStub,
    updateWorkspacePagesMetaDataByPageIdStub
  );
  return {
    sut,
    getPageByIdStub,
    updatePageIconByPageIdStub,
    updateWorkspacePagesMetaDataByPageIdStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id, icon } = mockPage();
  return {
    params: {
      pageId: id,
    },
    body: {
      icon,
    },
  };
};

describe('UpdatePageIconByPageIdController', () => {
  it('should call updatePageIconByPageId with correct params', async () => {
    const { sut, updatePageIconByPageIdStub } = makeSut();
    const updatePageIconByPageIdSpy = jest.spyOn(
      updatePageIconByPageIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updatePageIconByPageIdSpy).toHaveBeenCalledWith({
      pageId: httpRequest.params.pageId,
      icon: httpRequest.body.icon,
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
