export default interface Presenter<ResponseModel> {
  showSuccess(response: ResponseModel): void;
  showError(error: Error): void;
}
