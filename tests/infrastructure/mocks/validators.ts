import { Validation } from '@infrastructure/http/interfaces/Validation';

export class ValidationStub implements Validation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  validate(_input: any): Error | null {
    return null;
  }
}
