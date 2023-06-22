import { NextFunction, Request, Response } from 'express';

export const cors =
  (options: { origin: string; credentials: boolean }) =>
  (req: Request, res: Response, next: NextFunction): void => {
    // res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.set(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, PATCH, OPTIONS'
    );
    res.set('Access-Control-Allow-Origin', options.origin);
    res.set('Access-Control-Allow-Credentials', options.credentials.toString());
    next();
  };
