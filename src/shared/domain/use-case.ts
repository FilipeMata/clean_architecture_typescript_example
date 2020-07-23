export interface UseCase<RequestType, ResponseType> {
  execute(request?: RequestType): Promise<ResponseType> | ResponseType;
}