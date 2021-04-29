import { DetailOrder } from '@useCases'
import { HTTPRequest } from '../common/types';

interface HTTPDetailOrderParams {
  id: string
}

type HTTPDetailOrderInput = HTTPRequest<HTTPDetailOrderParams, void, void, void>

interface HttpDetailOrderControllerParams {
  detailOrderInteractor: DetailOrder.DetailOrderInteractor
}

export default class HttpDetailOrderController {
  private _interactor: DetailOrder.DetailOrderInteractor

  constructor(params: HttpDetailOrderControllerParams) {
    this._interactor = params.detailOrderInteractor;
  }

  async run(input: HTTPDetailOrderInput) {
    await this._interactor.execute(input.params.id);
  }
};
