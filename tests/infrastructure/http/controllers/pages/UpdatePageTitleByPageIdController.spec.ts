import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageTitleByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageTitleByPageIdController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  GetPageIdsByPathStub,
  UpdatePagePathByPageIdStub,
  UpdatePageTitleByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import { UpdateWorkspacePagesMetaDataByPageIdStub } from '@tests/application/mocks/workspaces/use-cases';
import mockPage from '@tests/domain/mock-page';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdatePageTitleByPageIdController;
  validationStub: ValidationStub;
  getPageByIdStub: GetPageByIdStub;
  updatePageTitleByPageIdStub: UpdatePageTitleByPageIdStub;
  updateWorkspacePagesMetaDataByPageIdStub: UpdateWorkspacePagesMetaDataByPageIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getPageByIdStub = new GetPageByIdStub();
  const getPageIdsByPathStub = new GetPageIdsByPathStub();
  const updatePageTitleByPageIdStub = new UpdatePageTitleByPageIdStub();
  const updatePagePathByPageIdStub = new UpdatePagePathByPageIdStub();
  const updateWorkspacePagesMetaDataByPageIdStub =
    new UpdateWorkspacePagesMetaDataByPageIdStub();

  const sut = new UpdatePageTitleByPageIdController(
    validationStub,
    getPageByIdStub,
    getPageIdsByPathStub,
    updatePageTitleByPageIdStub,
    updatePagePathByPageIdStub,
    updateWorkspacePagesMetaDataByPageIdStub
  );
  return {
    sut,
    getPageByIdStub,
    updatePageTitleByPageIdStub,
    validationStub,
    updateWorkspacePagesMetaDataByPageIdStub,
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
