export class InvalidTokenError extends Error {
  constructor() {
    super('Token was not found');
    this.name = 'InvalidTokenError';
  }
}
