import { Response } from 'express';
import HTTPResponse, { HTTPResponseHandler } from '@adapters/common/models/http-response';

export default class ExpressResponseHandler<T> implements HTTPResponseHandler<T> {
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