import { NextFunction, Request, Response } from 'express';

export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!res.type) {
    res.type('json');
  }
  next();
};
