import { DetailOrder, OutputPort } from '@useCases';
import { GetOrderDataInteractor } from '@useCases/common/get-order-data';

interface DetailOrderInteractorParams {
  getOrderDataInteractor: GetOrderDataInteractor,
  detailOrderDataPresenter: OutputPort<DetailOrder.DetailOrderResponseDTO>
}

export class DetailOrderInteractor {
  private _getOrderDataInteractor: GetOrderDataInteractor;
  private _presenter: OutputPort<DetailOrder.DetailOrderResponseDTO>;

  constructor(params: DetailOrderInteractorParams) {
    this._getOrderDataInteractor = params.getOrderDataInteractor;
    this._presenter = params.detailOrderDataPresenter;
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


