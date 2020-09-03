import { DetailOrder, OutputPort } from '@useCases';
import { GetOrderDataInteractor } from '@useCases/common/get-order-data';

export class DetailOrderInteractor {
  private _getOrderDataInteractor: GetOrderDataInteractor;
  private _presenter: OutputPort<DetailOrder.DetailOrderResponseDTO>;

  constructor(
    getOrderDataInteractor: GetOrderDataInteractor,
    presenter: OutputPort<DetailOrder.DetailOrderResponseDTO>
  ) {
    this._getOrderDataInteractor = getOrderDataInteractor;
    this._presenter = presenter;
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


