// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpResponse<T = any> = {
  statusCode: number;
  body?: T;
  headers?: { token: string };
};
