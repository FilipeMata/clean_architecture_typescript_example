import { DetailOrderInteractor } from '@useCases/detail-order';
import HTTPRequest from '@adapters/common/http-request';

interface HTTPDetailOrderParams {
  id: string
}

type HTTPDetailOrderInput = HTTPRequest<HTTPDetailOrderParams, void, void, void>

interface HttpDetailOrderControllerParams {
  detailOrderInteractor: DetailOrderInteractor
}

export default class HttpDetailOrderController {
  private _interactor: DetailOrderInteractor

  constructor(params: HttpDetailOrderControllerParams) {
    this._interactor = params.detailOrderInteractor;
  }

  async run(input: HTTPDetailOrderInput) {
    await this._interactor.run(input.params.id);
  }
};
