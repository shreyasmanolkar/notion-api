import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetAccessTokenController } from '@infrastructure/http/controllers/users/GetAccessTokenController';
import { makeGetAccessToken } from '@main/factories/use-cases/users/get-access-token-factory';

export const makeGetAccessTokenController = (): BaseController => {
  const useCase = makeGetAccessToken();

  return new GetAccessTokenController(useCase);
};
