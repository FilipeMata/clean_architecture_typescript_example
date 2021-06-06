import { AwilixContainer, asValue } from 'awilix';
import { Request, Response, NextFunction } from 'express';
import { HTTPResponseHandler } from '@adapters/common/types';
import { HTTPResponse } from '@adapters/common/types';


class ExpressResponseHandler<T> implements HTTPResponseHandler<T> {
  private _response: Response;

  constructor(response: Response) {
    this._response = response;
  }

  public send(data: HTTPResponse<T>): any {
    if(data.headers) {
      Object.keys(data.headers).forEach((key: string) => {
        this._response.setHeader(key, data.headers[key])
      });
    }
    
    this._response.status(data.statusCode);

    if (data.body) {
      return this._response.json(data.body);
    }

    return this._response.send(data.message);
  }
}

export default (container: AwilixContainer) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const scope = container.createScope();

    scope.register({
      httpResponseHandler: asValue(new ExpressResponseHandler<any>(res)),
    });

    req.container = scope;

    next();
  };
};

