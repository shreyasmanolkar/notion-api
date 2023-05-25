import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { SignUpController } from '@infrastructure/http/controllers/users/SignUpController';
import { makeSignUpValidation } from '@main/factories/controllers/users/sign-up/validation-factory';
import { makeSignIn } from '@main/factories/use-cases/users/sign-in-factory';
import { makeSignUp } from '@main/factories/use-cases/users/sign-up-factory';
import { makeAddMemberByWorkspaceId } from '@main/factories/use-cases/workspaces/add-member-by-workspace-id-factory';
import { makeCreateWorkspace } from '@main/factories/use-cases/workspaces/create-workspace-factory';

export const makeSignUpController = (): BaseController => {
  const validation = makeSignUpValidation();
  const signUpUseCase = makeSignUp();
  const signInUseCase = makeSignIn();
  const createWorkspaceUseCase = makeCreateWorkspace();
  const addMemberByWorkspaceIdUseCase = makeAddMemberByWorkspaceId();

  return new SignUpController(
    validation,
    signUpUseCase,
    signInUseCase,
    createWorkspaceUseCase,
    addMemberByWorkspaceIdUseCase
  );
};
