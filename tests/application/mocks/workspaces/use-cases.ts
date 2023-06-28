/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AddMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/AddMemberByWorkspaceIdInterface';
import { AddPageInterface } from '@application/interfaces/use-cases/workspaces/AddPageInterface';
import { CreateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/CreateWorkspaceInterface';
import { DeleteWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/DeleteWorkspaceInterface';
import { GetAllMembersByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/GetAllMembersByWorkspaceIdInterface';
import { GetAllRootPagesInterface } from '@application/interfaces/use-cases/workspaces/GetAllRootPagesInterface';
import { GetChildrensByPageReferenceInterface } from '@application/interfaces/use-cases/workspaces/GetChildrensByPageReferenceInterface';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { RemoveMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/RemoveMemberByWorkspaceIdInterface';
import { RemovePageByPageIdInterface } from '@application/interfaces/use-cases/workspaces/RemovePageByPageIdInterface';
import { UpdateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspaceInterface';
import { UpdateWorkspacePagesMetaDataByPageIdInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspacePagesMetaDataByPageIdInterface';
import mockWorkspace from '@tests/domain/mock-workspace';

export class AddMemberByWorkspaceIdStub
  implements AddMemberByWorkspaceIdInterface
{
  async execute(
    _params: AddMemberByWorkspaceIdInterface.Request
  ): Promise<AddMemberByWorkspaceIdInterface.Response> {}
}

export class AddPageStub implements AddPageInterface {
  async execute(
    _params: AddPageInterface.Request
  ): Promise<AddPageInterface.Response> {
    const workspace = mockWorkspace();
    return workspace;
  }
}

export class CreateWorkspaceStub implements CreateWorkspaceInterface {
  async execute(
    _workspaceData: CreateWorkspaceInterface.Request
  ): Promise<CreateWorkspaceInterface.Response> {
    const { id } = mockWorkspace();
    return id;
  }
}

export class DeleteWorkspaceStub implements DeleteWorkspaceInterface {
  async execute(
    _workspaceId: DeleteWorkspaceInterface.Request
  ): Promise<DeleteWorkspaceInterface.Response> {}
}

export class GetAllMembersByWorkspaceIdStub
  implements GetAllMembersByWorkspaceIdInterface
{
  async execute(
    _params: GetAllMembersByWorkspaceIdInterface.Request
  ): Promise<GetAllMembersByWorkspaceIdInterface.Response> {
    const { members } = mockWorkspace();
    return members;
  }
}

export class GetAllRootPagesStub implements GetAllRootPagesInterface {
  async execute(
    _params: GetAllRootPagesInterface.Request
  ): Promise<GetAllRootPagesInterface.Response> {
    return [
      {
        id: 'page-id-1',
        reference: 'sample-111',
        icon: 'icon-hex-code',
        path: null,
        title: 'sample',
        createdAt: new Date(),
      },
      {
        id: 'page-id-2',
        reference: 'sample-222',
        icon: 'icon-hex-code',
        path: null,
        title: 'sample',
        createdAt: new Date(),
      },
      {
        id: 'page-id-3',
        reference: 'sample-333',
        icon: 'icon-hex-code',
        path: null,
        title: 'sample',
        createdAt: new Date(),
      },
    ];
  }
}

export class GetChildrensByPageReferenceStub
  implements GetChildrensByPageReferenceInterface
{
  async execute(
    _params: GetChildrensByPageReferenceInterface.Request
  ): Promise<GetChildrensByPageReferenceInterface.Response> {
    return [
      {
        id: 'page-id-2',
        reference: 'sample-222',
        icon: 'icon-hex-code',
        path: ',sample-111,',
        title: 'sample',
        createdAt: new Date(),
      },
      {
        id: 'page-id-3',
        reference: 'sample-333',
        icon: 'icon-hex-code',
        path: ',sample-111,',
        title: 'sample',
        createdAt: new Date(),
      },
    ];
  }
}

export class GetWorkspaceByIdStub implements GetWorkspaceByIdInterface {
  async execute(
    params: GetWorkspaceByIdInterface.Request
  ): Promise<GetWorkspaceByIdInterface.Response> {
    const workspace = mockWorkspace();

    return workspace;
  }
}

export class RemoveMemberByWorkspaceIdStub
  implements RemoveMemberByWorkspaceIdInterface
{
  async execute(
    params: RemoveMemberByWorkspaceIdInterface.Request
  ): Promise<RemoveMemberByWorkspaceIdInterface.Response> {}
}

export class RemovePageByPageIdStub implements RemovePageByPageIdInterface {
  async execute(
    params: RemovePageByPageIdInterface.Request
  ): Promise<RemovePageByPageIdInterface.Response> {}
}

export class UpdateWorkspaceStub implements UpdateWorkspaceInterface {
  async execute(
    params: UpdateWorkspaceInterface.Request
  ): Promise<UpdateWorkspaceInterface.Response> {
    const workspace = mockWorkspace();
    return workspace;
  }
}

export class UpdateWorkspacePagesMetaDataByPageIdStub
  implements UpdateWorkspacePagesMetaDataByPageIdInterface
{
  async execute(
    params: UpdateWorkspacePagesMetaDataByPageIdInterface.Request
  ): Promise<UpdateWorkspacePagesMetaDataByPageIdInterface.Response> {}
}
