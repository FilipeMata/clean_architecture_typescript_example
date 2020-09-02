import { DetailOrder } from '@useCases'

type APIDetailOrderInput = {
  params: any,
  headers?: any,
  body: any
}

export class HttpDetailOrderController {
  private _input: APIDetailOrderInput;
  private _detailOrderInteractor: DetailOrder.DetailOrderInteractor

  constructor(input: APIDetailOrderInput, interactor: DetailOrder.DetailOrderInteractor) {
    this._input = input;
    this._detailOrderInteractor = interactor;
  }

  async run() {
      await this._detailOrderInteractor.execute(this._input.params.id);
  }
};
