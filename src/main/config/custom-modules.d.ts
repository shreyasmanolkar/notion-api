/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable no-unused-vars */
declare module Express {
  interface Request {
    userId?: string;
    workspaceId?: string;
  }
}
