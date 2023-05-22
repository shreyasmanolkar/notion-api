import { SignOut } from '@application/use-cases/users/SignOut';
import { DeleteTokenRepositoryStub } from '@tests/infrastructure/mocks/tokens/repositories';

type SutTypes = {
  sut: SignOut;
  deleteTokenRepositoryStub: DeleteTokenRepositoryStub;
};

const makeSut = (): SutTypes => {
  const deleteTokenRepositoryStub = new DeleteTokenRepositoryStub();
  const sut = new SignOut(deleteTokenRepositoryStub);

  return {
    sut,
    deleteTokenRepositoryStub,
  };
};

describe('SignOut', () => {
  it('should call deleteTokenRepository with correct data', async () => {
    const { sut, deleteTokenRepositoryStub } = makeSut();
    const deleteTokenRepositorySpy = jest.spyOn(
      deleteTokenRepositoryStub,
      'deleteToken'
    );

    const sampleToken = 'sample-refresh-token';
    await sut.execute(sampleToken);

    expect(deleteTokenRepositorySpy).toHaveBeenCalledWith(sampleToken);
  });
});
