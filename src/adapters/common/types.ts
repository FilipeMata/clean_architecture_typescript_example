export type HTTPRequest<Params, Headers, Body, Query> = {
  params?: Params,
  headers?: Headers,
  body?: Body,
  query?: Query
}

export type HTTPResponse<T> = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export interface ResponseHandler<T> {
  send(response: HTTPResponse<T>): Promise<void>
}