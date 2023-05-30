import { DeletePageRepository } from '@application/interfaces/repositories/pages/deletePageRepository';
import { DeletePageInterface } from '@application/interfaces/use-cases/pages/deletePageInterface';

export class DeletePage implements DeletePageInterface {
  constructor(private readonly deletePageRepository: DeletePageRepository) {}

  async execute(
    pageId: DeletePageInterface.Request
  ): Promise<DeletePageInterface.Response> {
    await this.deletePageRepository.deletePage(pageId);
  }
}
