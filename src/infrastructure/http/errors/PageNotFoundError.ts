export class PageNotFoundError extends Error {
  constructor() {
    super('Page Not Found Error');
    this.name = 'PageNotFoundError';
  }
}
