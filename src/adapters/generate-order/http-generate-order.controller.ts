import { GenerateOrder } from '@useCases'
import { AddressDTO } from '@useCases/common/dtos';
import { HTTPRequest } from '../common/types';

interface HTTPGenerateOrderBody {
  customer_id: string,
  items: {
    product_id: string,
    quantity: number
  }[],
  billing_address: AddressDTO,
  use_customer_address: boolean
}

type HTTPGenerateOrderInput = HTTPRequest<void, void, HTTPGenerateOrderBody, void>

interface HTTPGenerateOrderControllerParams {
  generateOrderInteractor: GenerateOrder.GenerateOrderInteractor
}

export default class HTTPGenerateOrderController {
  private _interactor: GenerateOrder.GenerateOrderInteractor

  constructor(params: HTTPGenerateOrderControllerParams) {
    this._interactor = params.generateOrderInteractor;
  }

  async run(input: HTTPGenerateOrderInput) {
    const request: GenerateOrder.GenerateOrderRequestDTO = {
      customerId: input.body.customer_id,
      items: input.body.items.map((item) => {
        return {
          productId: item.product_id,
          quantity: item.quantity
        }
      }),
      billingAddress: input.body.billing_address,
      shouldConsiderCustomerAddressForBilling: input.body.use_customer_address
    };

    await this._interactor.execute(request);
  }
};
