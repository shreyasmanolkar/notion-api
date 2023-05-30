import { CreatePageRepository } from '@application/interfaces/repositories/pages/createPageRepository';
import { CreatePageInterface } from '@application/interfaces/use-cases/pages/createPageInterface';

export class CreatePage implements CreatePageInterface {
  constructor(private readonly createPageRepository: CreatePageRepository) {}

  async execute(
    pageData: CreatePageInterface.Request
  ): Promise<CreatePageInterface.Response> {
    return this.createPageRepository.createPage(pageData);
  }
}
