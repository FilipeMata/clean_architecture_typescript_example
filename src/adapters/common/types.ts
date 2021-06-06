export type HTTPRequest<Params, Headers, Body, Query> = {
  params?: Params,
  headers?: Headers,
  body?: Body,
  query?: Query
}

type HTTPHeaders = {
  [key: string]: string
}

export type HTTPResponse<T> = {
  statusCode: number,
  message?: string,
  body?: T,
  headers?: HTTPHeaders
};

export interface HTTPResponseHandler<T> {
  send(response: HTTPResponse<T>): any
}