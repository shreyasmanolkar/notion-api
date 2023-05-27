import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { AddToFavoriteController } from '@infrastructure/http/controllers/pages/AddToFavoriteController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  AddToFavoriteStub,
  GetPageByIdStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';

type SutTypes = {
  sut: AddToFavoriteController;
  getPageByIdStub: GetPageByIdStub;
  addToFavoriteStub: AddToFavoriteStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdStub = new GetPageByIdStub();
  const addToFavoriteStub = new AddToFavoriteStub();
  const sut = new AddToFavoriteController(getPageByIdStub, addToFavoriteStub);
  return {
    getPageByIdStub,
    addToFavoriteStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockPage();
  return {
    params: {
      pageId: id,
      userId: 'sample-user-id-2',
    },
  };
};

describe('AddToFavoriteController', () => {
  it('should call AddToFavorite with correct params', async () => {
    const { sut, addToFavoriteStub } = makeSut();

    const addToFavoriteSpy = jest.spyOn(addToFavoriteStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addToFavoriteSpy).toHaveBeenCalledWith({
      ...httpRequest.params,
    });
  });

  it('should return 404 if workspace is not found', async () => {
    const { sut, getPageByIdStub } = makeSut();
    const httpRequest = makeFakeHttpRequest();

    jest.spyOn(getPageByIdStub, 'execute').mockImplementation(async () => {
      return new PageNotFoundError();
    });

    const httpResponse = await sut.handle({
      params: { ...httpRequest.params, pageId: 'other_page_id' },
    });

    expect(httpResponse).toEqual(notFound(new PageNotFoundError()));
  });

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
  });
});
