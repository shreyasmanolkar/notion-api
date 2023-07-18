import { CreateWorkspaceController } from '@infrastructure/http/controllers/workspaces/CreateWorkspaceController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  CreatePageStub,
  GetPageByIdStub,
} from '@tests/application/mocks/pages/use-cases';
import { AddWorkspaceByUserIdStub } from '@tests/application/mocks/users/use-cases';
import {
  AddPageStub,
  CreateWorkspaceStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: CreateWorkspaceController;
  validationStub: ValidationStub;
  createWorkspaceStub: CreateWorkspaceStub;
  createPageStub: CreatePageStub;
  getPageByIdStub: GetPageByIdStub;
  addPageStub: AddPageStub;
  addWorkspaceByUserIdStub: AddWorkspaceByUserIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const createWorkspaceStub = new CreateWorkspaceStub();
  const createPageStub = new CreatePageStub();
  const getPageByIdStub = new GetPageByIdStub();
  const addPageStub = new AddPageStub();
  const addWorkspaceByUserIdStub = new AddWorkspaceByUserIdStub();

  const sut = new CreateWorkspaceController(
    validationStub,
    createWorkspaceStub,
    createPageStub,
    getPageByIdStub,
    addPageStub,
    addWorkspaceByUserIdStub
  );
  return {
    sut,
    validationStub,
    createWorkspaceStub,
    createPageStub,
    getPageByIdStub,
    addPageStub,
    addWorkspaceByUserIdStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { name, icon, members } = mockWorkspace();
  return {
    body: {
      name,
      icon,
      members,
    },
  };
};

describe('CreateWorkspaceController', () => {
  it('should call createWorkspace with correct params', async () => {
    const { sut, createWorkspaceStub } = makeSut();

    const createWorkspaceSpy = jest.spyOn(createWorkspaceStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(createWorkspaceSpy).toHaveBeenCalled();
  });

  it('should call addWorkspaceByUserId with correct params', async () => {
    const { sut, addWorkspaceByUserIdStub } = makeSut();

    const addWorkspaceByUserIdSpy = jest.spyOn(
      addWorkspaceByUserIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addWorkspaceByUserIdSpy).toHaveBeenCalled();
  });

  it('should call CreatePage with given params', async () => {
    const { sut, createPageStub } = makeSut();

    const createPageSpy = jest.spyOn(createPageStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(createPageSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Vikram Lander & Pragyan Rover',
        icon: '1f52d',
        coverPicture: {
          url: '/static/media/nasa_robert_stewart_spacewalk.b79b6b06db3b4359b361.jpg',
          verticalPosition: 0,
        },
        favorite: [],
        pageSettings: {
          font: 'san-serif',
          smallText: true,
          fullWidth: true,
          lock: true,
        },
        path: null,
      })
    );
  });

  it('should call getPageById with given params', async () => {
    const { sut, getPageByIdStub } = makeSut();

    const getPageByIdSpy = jest.spyOn(getPageByIdStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getPageByIdSpy).toBeCalled();
  });

  it('should call addPage with given params', async () => {
    const { sut, addPageStub } = makeSut();

    const addPageSpy = jest.spyOn(addPageStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addPageSpy).toBeCalled();
  });

  it('should return 201 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
  });
});
