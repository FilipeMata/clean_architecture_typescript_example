type HTTPHeaders = {
  [key: string]: string
}

export default interface HTTPResponse<T> {
  statusCode: number,
  message?: string,
  body?: T,
  headers?: HTTPHeaders
};

export interface HTTPResponseHandler<T> {
  send(response: HTTPResponse<T>): void
}