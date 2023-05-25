import { CreateWorkspaceController } from '@infrastructure/http/controllers/workspaces/CreateWorkspaceController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { CreateWorkspaceStub } from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: CreateWorkspaceController;
  validationStub: ValidationStub;
  createWorkspaceStub: CreateWorkspaceStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const createWorkspaceStub = new CreateWorkspaceStub();
  const sut = new CreateWorkspaceController(
    validationStub,
    createWorkspaceStub
  );
  return {
    sut,
    validationStub,
    createWorkspaceStub,
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

  it('should return 201 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
  });
});
