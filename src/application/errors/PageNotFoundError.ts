export class PageNotFoundError extends Error {
  constructor() {
    super('The Page was not found');
    this.name = 'PageNotFoundError';
  }
}
