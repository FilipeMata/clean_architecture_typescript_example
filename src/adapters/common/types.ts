export type HTTPRequest<Params, Headers, Body, Query> = {
  params?: Params,
  headers?: Headers,
  body?: Body,
  query?: Query
}

export type HTTPResponse<T> = {
  statusCode: number,
  message?: string,
  body?: T,
  headers?: JSON
};

export interface HTTPResponseHandler<T> {
  send(response: HTTPResponse<T>): Promise<void>
}