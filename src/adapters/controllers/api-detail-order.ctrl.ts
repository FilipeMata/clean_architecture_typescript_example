import DetailOrderInputPort  from '../../application/use-cases/detail-order/detail-order.input';

type APIDetailOrderInput = {
  params: any,
  headers?: any,
  body: any
}

export default class APIDetailOrderController {
  private _input: APIDetailOrderInput;
  private _detailOrderInteractor: DetailOrderInputPort

  constructor(input: APIDetailOrderInput, interactor: DetailOrderInputPort) {
    this._input = input;
    this._detailOrderInteractor = interactor;
  }

  async run() {
      await (await this._detailOrderInteractor.execute(this._input.params.id));
  }
};
