export class WorkspaceNotFoundError extends Error {
  constructor() {
    super('The Workspace was not found');
    this.name = 'WorkspaceNotFoundError';
  }
}
