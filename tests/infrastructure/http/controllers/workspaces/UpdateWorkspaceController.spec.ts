import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UpdateWorkspaceController } from '@infrastructure/http/controllers/workspaces/UpdateWorkspaceController';
import { notFound, ok } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { UpdateUserWorkspaceMetaDataByWorkspaceIdStub } from '@tests/application/mocks/users/use-cases';
import {
  GetAllMembersByWorkspaceIdStub,
  GetWorkspaceByIdStub,
  UpdateWorkspaceStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdateWorkspaceController;
  validationStub: ValidationStub;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  updateWorkspaceStub: UpdateWorkspaceStub;
  getAllMembersByWorkspaceIdStub: GetAllMembersByWorkspaceIdStub;
  updateUserWorkspaceMetaDataByWorkspaceIdStub: UpdateUserWorkspaceMetaDataByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const updateWorkspaceStub = new UpdateWorkspaceStub();
  const getAllMembersByWorkspaceIdStub = new GetAllMembersByWorkspaceIdStub();
  const updateUserWorkspaceMetaDataByWorkspaceIdStub =
    new UpdateUserWorkspaceMetaDataByWorkspaceIdStub();

  const sut = new UpdateWorkspaceController(
    validationStub,
    getWorkspaceByIdStub,
    updateWorkspaceStub,
    getAllMembersByWorkspaceIdStub,
    updateUserWorkspaceMetaDataByWorkspaceIdStub
  );

  return {
    sut,
    getWorkspaceByIdStub,
    updateWorkspaceStub,
    validationStub,
    getAllMembersByWorkspaceIdStub,
    updateUserWorkspaceMetaDataByWorkspaceIdStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { name, icon, members, pages, id } = mockWorkspace();
  return {
    params: {
      workspaceId: id,
    },
    body: {
      name,
      icon,
      members,
      pages,
    },
  };
};

describe('UpdateWorkspaceController', () => {
  it('should call updateWorkspace with correct params', async () => {
    const { sut, updateWorkspaceStub } = makeSut();
    const updateWorkspaceSpy = jest.spyOn(updateWorkspaceStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updateWorkspaceSpy).toHaveBeenCalledWith({
      workspaceId: httpRequest.params.workspaceId,
      workspaceData: httpRequest.body,
    });
  });

  it('should return 404 if getWorkspaceByIdStub returns a WorkspaceNotFoundError', async () => {
    const { sut, getWorkspaceByIdStub } = makeSut();
    jest
      .spyOn(getWorkspaceByIdStub, 'execute')
      .mockImplementation(async () => new WorkspaceNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new WorkspaceNotFoundError()));
  });

  it('should return 404 if updateWorkspace returns a WorkspaceNotFoundError', async () => {
    const { sut, updateWorkspaceStub } = makeSut();
    jest
      .spyOn(updateWorkspaceStub, 'execute')
      .mockImplementation(async () => new WorkspaceNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new WorkspaceNotFoundError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const workspace = mockWorkspace();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(ok(workspace));
  });
});
