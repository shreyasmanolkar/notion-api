import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { BaseMiddleware } from '@infrastructure/http/middlewares/BaseMiddleware';
import { NextFunction, Request, Response } from 'express';

export const expressMiddlewareAdapter =
  (middleware: BaseMiddleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
      userId: req.userId,
    };

    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body?.message,
      });
    }
  };
