/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddMemberByWorkspaceIdRepository } from '@application/interfaces/repositories/workspaces/addMemberByWorkspaceIdRepository';
import { AddPageRepository } from '@application/interfaces/repositories/workspaces/addPageRepository';
import { CreateWorkspaceRepository } from '@application/interfaces/repositories/workspaces/createWorkspaceRepository';
import { DeleteWorkspaceRepository } from '@application/interfaces/repositories/workspaces/deleteWorkspaceRepository';
import { GetAllMembersByWorkspaceIdRepository } from '@application/interfaces/repositories/workspaces/getAllMembersByWorkspaceIdRepository';
import { GetAllRootPagesRepository } from '@application/interfaces/repositories/workspaces/getAllRootPagesRepository';
import { GetChildrensByPageReferenceRepository } from '@application/interfaces/repositories/workspaces/getChildrensByPageReferenceRepsoitory';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { RemoveMemberByWorkspaceIdRepository } from '@application/interfaces/repositories/workspaces/removeMemberByWorkspaceIdRepository';
import { RemovePageByPageIdRepository } from '@application/interfaces/repositories/workspaces/removePageByPageIdRepository';
import { UpdateWorkspaceRepository } from '@application/interfaces/repositories/workspaces/updateWorkspaceRepository';
import mockWorkspace from '@tests/domain/mock-workspace';

export class CreateWorkspaceRepositoryStub
  implements CreateWorkspaceRepository
{
  async createWorkspace(
    _workspaceData: CreateWorkspaceRepository.Request
  ): Promise<CreateWorkspaceRepository.Response> {
    const { id } = mockWorkspace();
    return id;
  }
}

export class AddMemberByWorkspaceIdRepositoryStub
  implements AddMemberByWorkspaceIdRepository
{
  async addMemberByWorkspaceId(
    _params: AddMemberByWorkspaceIdRepository.Request
  ): Promise<AddMemberByWorkspaceIdRepository.Response> {
    return mockWorkspace();
  }
}

export class AddPageRepositoryStub implements AddPageRepository {
  async addPage(
    _params: AddPageRepository.Request
  ): Promise<AddPageRepository.Response> {
    return mockWorkspace();
  }
}

export class GetAllMembersByWorkspaceIdRepositoryStub
  implements GetAllMembersByWorkspaceIdRepository
{
  async getAllMembersByWorkspaceId(
    _workspaceId: GetAllMembersByWorkspaceIdRepository.Request
  ): Promise<GetAllMembersByWorkspaceIdRepository.Response> {
    return ['sample-member-1', 'sample-member-2'];
  }
}

export class GetAllRootPagesRepositoryStub
  implements GetAllRootPagesRepository
{
  async getAllRootPages(
    _workspaceId: GetAllRootPagesRepository.Request
  ): Promise<GetAllRootPagesRepository.Response> {
    return [
      {
        id: 'sample-page-1',
        reference: 'sample-page-reference',
        icon: 'icon-hex',
        path: null,
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-2',
        reference: 'sample-page-reference-2',
        icon: 'icon-hex',
        path: null,
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-3',
        reference: 'sample-page-reference-3',
        icon: 'icon-hex',
        path: null,
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
    ];
  }
}

export class GetChildrensByPageReferenceRepositoryStub
  implements GetChildrensByPageReferenceRepository
{
  async getChildrensByPageId(
    _params: GetChildrensByPageReferenceRepository.Request
  ): Promise<GetChildrensByPageReferenceRepository.Response> {
    return [
      {
        id: 'sample-page-1',
        reference: 'sample-page-reference-1',
        icon: 'icon-hex',
        path: ',sample-page-reference-0,',
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-2',
        reference: 'sample-page-reference-2',
        icon: 'icon-hex',
        path: ',sample-page-reference-0,',
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
    ];
  }
}

export class GetWorkspaceByIdRepositoryStub
  implements GetWorkspaceByIdRepository
{
  async getWorkspaceById(
    _workspaceId: GetWorkspaceByIdRepository.Request
  ): Promise<GetWorkspaceByIdRepository.Response> {
    return mockWorkspace();
  }
}

export class UpdateWorkspaceRepositoryStub
  implements UpdateWorkspaceRepository
{
  async updateWorkspace(
    _params: UpdateWorkspaceRepository.Request
  ): Promise<UpdateWorkspaceRepository.Response> {
    return mockWorkspace();
  }
}

export class RemoveMemberByWorkspaceIdRepositoryStub
  implements RemoveMemberByWorkspaceIdRepository
{
  async removeMemberByWorkspaceId(
    _params: RemoveMemberByWorkspaceIdRepository.Request
  ): Promise<RemoveMemberByWorkspaceIdRepository.Response> {
    return mockWorkspace();
  }
}

export class RemovePageByPageIdRepositoryStub
  implements RemovePageByPageIdRepository
{
  async removePageByPageId(
    _params: RemovePageByPageIdRepository.Request
  ): Promise<RemovePageByPageIdRepository.Response> {
    return mockWorkspace();
  }
}

export class DeleteWorkspaceRepositoryStub
  implements DeleteWorkspaceRepository
{
  async deleteWorkspace(_workspaceId: string): Promise<void> {}
}
