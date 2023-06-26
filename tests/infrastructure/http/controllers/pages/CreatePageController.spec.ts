import { CreatePageController } from '@infrastructure/http/controllers/pages/CreatePageController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  CreatePageStub,
  GetPageByIdStub,
} from '@tests/application/mocks/pages/use-cases';
import { AddPageIdToFavoritesByWorkspaceIdStub } from '@tests/application/mocks/users/use-cases';
import { AddPageStub } from '@tests/application/mocks/workspaces/use-cases';
import mockPage from '@tests/domain/mock-page';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: CreatePageController;
  validationStub: ValidationStub;
  createPageStub: CreatePageStub;
  getPageByIdStub: GetPageByIdStub;
  addPageStub: AddPageStub;
  addPageIdToFavoritesByWorkspaceIdStub: AddPageIdToFavoritesByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const createPageStub = new CreatePageStub();
  const getPageByIdStub = new GetPageByIdStub();
  const addPageStub = new AddPageStub();
  const addPageIdToFavoritesByWorkspaceIdStub =
    new AddPageIdToFavoritesByWorkspaceIdStub();

  const sut = new CreatePageController(
    validationStub,
    createPageStub,
    getPageByIdStub,
    addPageStub,
    addPageIdToFavoritesByWorkspaceIdStub
  );
  return {
    sut,
    validationStub,
    createPageStub,
    getPageByIdStub,
    addPageStub,
    addPageIdToFavoritesByWorkspaceIdStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const {
    title,
    icon,
    coverPicture,
    content,
    favorite,
    pageSettings,
    path,
    workspaceId,
  } = mockPage();

  return {
    body: {
      title,
      icon,
      coverPicture,
      content,
      favorite,
      pageSettings,
      path,
      workspaceId,
    },
  };
};

describe('CreatePageController', () => {
  it('should call createPage with correct params', async () => {
    const { sut, createPageStub } = makeSut();

    const createPageSpy = jest.spyOn(createPageStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(createPageSpy).toHaveBeenCalled();
  });

  it('should call createPage with correct params', async () => {
    const { sut, createPageStub } = makeSut();

    const createPageSpy = jest.spyOn(createPageStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(createPageSpy).toHaveBeenCalled();
  });

  it('should call createPage with correct params', async () => {
    const { sut, addPageStub } = makeSut();

    const addPageSpy = jest.spyOn(addPageStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addPageSpy).toHaveBeenCalled();
  });

  it('should return 201 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
  });
});
