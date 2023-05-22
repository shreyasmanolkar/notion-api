import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { Request, Response } from 'express';

export const expressRouteRemoveCookieAdapter =
  (controller: BaseController) => async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
      userId: req.userId,
    };

    const httpResponse = await controller.handle(httpRequest);
    const refreshToken = httpResponse.headers?.token;

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res
        .status(httpResponse.statusCode)
        .cookie('token_v1', refreshToken, {
          sameSite: 'strict',
          path: '/',
          httpOnly: true,
          expires: new Date(0),
        })
        .json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body?.message,
      });
    }
  };
