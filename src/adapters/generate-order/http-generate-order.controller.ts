import { AddressProps } from '@entities';
import {
  GenerateOrderInteractor,
  GenerateOrderRequestDTO
} from '@useCases/generate-order';
import HTTPRequest from '@adapters/common/models/http-request';

interface HTTPGenerateOrderBody {
  customer_id: string,
  items: {
    product_id: number,
    quantity: number
  }[],
  billing_address: AddressProps,
  use_customer_address: boolean
}

type HTTPGenerateOrderInput = HTTPRequest<void, void, HTTPGenerateOrderBody, void>

interface HTTPGenerateOrderControllerParams {
  generateOrderInteractor: GenerateOrderInteractor
}

export default class HTTPGenerateOrderController {
  private _interactor: GenerateOrderInteractor

  constructor(params: HTTPGenerateOrderControllerParams) {
    this._interactor = params.generateOrderInteractor;
  }

  async run(input: HTTPGenerateOrderInput) {
    const request: GenerateOrderRequestDTO = {
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

    await this._interactor.run(request);
  }
};
