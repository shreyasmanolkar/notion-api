import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { RemoveFromFavoriteController } from '@infrastructure/http/controllers/pages/RemoveFromFavoriteController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  RemoveFromFavoriteStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';

type SutTypes = {
  sut: RemoveFromFavoriteController;
  getPageByIdStub: GetPageByIdStub;
  removeFromFavoriteStub: RemoveFromFavoriteStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdStub = new GetPageByIdStub();
  const removeFromFavoriteStub = new RemoveFromFavoriteStub();
  const sut = new RemoveFromFavoriteController(
    getPageByIdStub,
    removeFromFavoriteStub
  );
  return {
    getPageByIdStub,
    removeFromFavoriteStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockPage();
  return {
    params: {
      pageId: id,
      userId: 'sample-user-id-1',
    },
  };
};

describe('RemoveFromFavoriteController', () => {
  it('should call RemoveFromFavorite with correct params', async () => {
    const { sut, removeFromFavoriteStub } = makeSut();

    const removeFromFavoriteSpy = jest.spyOn(removeFromFavoriteStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(removeFromFavoriteSpy).toHaveBeenCalledWith({
      ...httpRequest.params,
    });
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

    expect(httpResponse.statusCode).toBe(204);
  });
});
