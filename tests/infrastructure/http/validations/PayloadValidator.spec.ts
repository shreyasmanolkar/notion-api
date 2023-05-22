import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';

type SutTypes = {
  sut: PayloadValidator;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
};

const makeSut = (): SutTypes => {
  const schema = {
    type: 'object',
    properties: {
      foo: { type: 'integer' },
    },
    required: ['foo'],
    additionalProperties: false,
  };

  const sut = new PayloadValidator(schema, 'body');
  return {
    sut,
    schema,
  };
};

describe('PayloadValidator', () => {
  it('should return an error if any validation fails', () => {
    const { sut } = makeSut();

    jest.spyOn(sut, 'validate').mockImplementation(() => {
      return new Error('any_error');
    });

    const error = sut.validate({});

    expect(error?.message).toEqual('any_error');
  });

  it('should return null if no validation fails', () => {
    const { sut } = makeSut();
    const error = sut.validate({ head: 'sample-head', body: { foo: 1 } });

    expect(error).toBeNull();
  });

  it('should return the first error if nore that one validation fails', () => {
    const { sut } = makeSut();
    jest
      .spyOn(sut, 'validate')
      .mockImplementation(() => new Error('any_error'));

    const error = sut.validate({ head: 'sample-head', body: {} });

    expect(error).toEqual(new Error('any_error'));
  });

  it('should run through all its validation and calls the validate method on them', () => {
    const { sut } = makeSut();
    const validateSpy = jest.spyOn(sut, 'validate');

    const request = { head: 'sample-head', body: { foo: 1 } };

    sut.validate(request);

    expect(validateSpy).toHaveBeenCalledWith(request);
  });
});
