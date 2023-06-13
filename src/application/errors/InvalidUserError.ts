export class InvalidUserError extends Error {
  constructor() {
    super('Invalid User');
    this.name = 'InvalidUserError';
  }
}
