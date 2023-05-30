import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageSettingsByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageSettingsByPageIdController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetPageByIdStub,
  UpdatePageSettingsByPageIdStub,
} from '@tests/application/mocks/pages/use-cases';
import mockPage from '@tests/domain/mock-page';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdatePageSettingsByPageIdController;
  validationStub: ValidationStub;
  getPageByIdStub: GetPageByIdStub;
  updatePageSettingsByPageIdStub: UpdatePageSettingsByPageIdStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getPageByIdStub = new GetPageByIdStub();
  const updatePageSettingsByPageIdStub = new UpdatePageSettingsByPageIdStub();
  const sut = new UpdatePageSettingsByPageIdController(
    validationStub,
    getPageByIdStub,
    updatePageSettingsByPageIdStub
  );
  return {
    sut,
    getPageByIdStub,
    updatePageSettingsByPageIdStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id, pageSettings } = mockPage();
  return {
    params: {
      pageId: id,
    },
    body: {
      settings: pageSettings,
    },
  };
};

describe('UpdatePageSettingsByPageIdController', () => {
  it('should call UpdatePageSettingsByPageId with correct params', async () => {
    const { sut, updatePageSettingsByPageIdStub } = makeSut();
    const updatePageSettingsByPageIdSpy = jest.spyOn(
      updatePageSettingsByPageIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updatePageSettingsByPageIdSpy).toHaveBeenCalledWith({
      pageId: httpRequest.params.pageId,
      settings: httpRequest.body.settings,
    });
  });

  it('should return 404 if GetPageById returns a PageNotFoundError', async () => {
    const { sut, getPageByIdStub } = makeSut();
    jest
      .spyOn(getPageByIdStub, 'execute')
      .mockImplementation(async () => new PageNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new PageNotFoundError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
