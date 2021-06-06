import { GetOrderDataInteractor } from '@useCases/common/get-order-data';
import { DetailOrderPresenter } from './detail-order.ports';

interface DetailOrderInteractorParams {
  getOrderDataInteractor: GetOrderDataInteractor,
  detailOrderPresenter: DetailOrderPresenter
}

export default class DetailOrderInteractor {
  private _getOrderDataInteractor: GetOrderDataInteractor;
  private _presenter: DetailOrderPresenter;

  constructor(params: DetailOrderInteractorParams) {
    this._getOrderDataInteractor = params.getOrderDataInteractor;
    this._presenter = params.detailOrderPresenter;
  }

  public async execute(orderId: string) {    
    const orderDataResult = await this._getOrderDataInteractor
      .execute(orderId);

    if (!orderDataResult.succeeded) {
      return this._presenter.show({
        failures: orderDataResult.errors
      });
    }

    return this._presenter.show({
      success: orderDataResult.value
    });
  }
}


