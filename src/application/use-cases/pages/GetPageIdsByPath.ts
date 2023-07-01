import { GetPageIdsByPathRepository } from '@application/interfaces/repositories/pages/getPageIdsByPathRepository';
import { GetPageIdsByPathInterface } from '@application/interfaces/use-cases/pages/getPageIdsByPathInterface';

export class GetPageIdsByPath implements GetPageIdsByPathInterface {
  constructor(
    private readonly getPageIdsByPathRepository: GetPageIdsByPathRepository
  ) {}

  async execute(
    path: GetPageIdsByPathInterface.Request
  ): Promise<GetPageIdsByPathInterface.Response> {
    const workspaces = await this.getPageIdsByPathRepository.getPageIdsByPath(
      path
    );

    return workspaces!;
  }
}
