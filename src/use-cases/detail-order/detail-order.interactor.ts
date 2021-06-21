import { OrderData } from '@useCases/common/dtos';
import { GetOrderDataInteractor } from '@useCases/common/get-order-data';
import Interactor from '@useCases/common/interactor';
import Presenter from '@useCases/common/presenter';

interface DetailOrderInteractorParams {
  getOrderDataInteractor: GetOrderDataInteractor,
  detailOrderPresenter: Presenter<OrderData>
}

export default class DetailOrderInteractor extends Interactor<string, OrderData> {
  private _getOrderDataInteractor: GetOrderDataInteractor;

  constructor(params: DetailOrderInteractorParams) {
    super(params.detailOrderPresenter);
    this._getOrderDataInteractor = params.getOrderDataInteractor;
  }

  protected async execute(orderId: string) {

      return await this._getOrderDataInteractor
        .execute(orderId);
  }
}


