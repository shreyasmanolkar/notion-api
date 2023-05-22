/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validation } from '@infrastructure/http/interfaces/Validation';
import ajvInstance from '@infrastructure/http/validations/AJVInstance';

export class PayloadValidator implements Validation {
  constructor(private readonly schema: any, private readonly segment: string) {}

  validate(request: any): Error | null {
    const input = request[this.segment];

    const validator = ajvInstance.compile(this.schema);

    const isValid = validator(input);
    if (!isValid) {
      const { errors }: any = validator;
      const { instancePath, message } = errors[0];

      return new Error(`${instancePath} ${message}`);
    }

    return null;
  }
}
