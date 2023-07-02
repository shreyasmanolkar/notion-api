import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { DeletePageController } from '@infrastructure/http/controllers/pages/DeletePageController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  DeletePageStub,
  GetPageByIdStub,
} from '@tests/application/mocks/pages/use-cases';
import { RemovePageIdFromFavoritesByWorkspaceIdStub } from '@tests/application/mocks/users/use-cases';
import {
  GetWorkspaceByIdStub,
  RemovePageByPageIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockPage from '@tests/domain/mock-page';

type SutTypes = {
  sut: DeletePageController;
  getPageByIdStub: GetPageByIdStub;
  deletePageStub: DeletePageStub;
  removePageByPageIdStub: RemovePageByPageIdStub;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  removePageIdFromFavoritesByWorkspaceIdStub: RemovePageIdFromFavoritesByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdStub = new GetPageByIdStub();
  const deletePageStub = new DeletePageStub();
  const removePageByPageIdStub = new RemovePageByPageIdStub();
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const removePageIdFromFavoritesByWorkspaceIdStub =
    new RemovePageIdFromFavoritesByWorkspaceIdStub();

  const sut = new DeletePageController(
    getPageByIdStub,
    deletePageStub,
    removePageByPageIdStub,
    getWorkspaceByIdStub,
    removePageIdFromFavoritesByWorkspaceIdStub
  );

  return {
    sut,
    getPageByIdStub,
    deletePageStub,
    removePageByPageIdStub,
    getWorkspaceByIdStub,
    removePageIdFromFavoritesByWorkspaceIdStub,
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

describe('DeletePageController', () => {
  it('should call deletePage with correct id', async () => {
    const { sut, deletePageStub } = makeSut();

    const deletePageSpy = jest.spyOn(deletePageStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deletePageSpy).toHaveBeenCalledWith(httpRequest.params.pageId);
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

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse.statusCode).toBe(204);
  });
});
