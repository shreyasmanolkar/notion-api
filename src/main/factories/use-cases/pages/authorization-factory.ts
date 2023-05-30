import { AuthorizationInterface } from '@application/interfaces/use-cases/pages/authorizationInterface';
import { Authorization } from '@application/use-cases/pages/Authorization';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeAuthorization = (): AuthorizationInterface => {
  const userRepository = new UserRepository();
  const pageRepository = new PageRepository();

  return new Authorization(pageRepository, userRepository);
};
