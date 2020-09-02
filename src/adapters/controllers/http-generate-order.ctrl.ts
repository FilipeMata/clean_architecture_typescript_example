import { GenerateOrder } from '@aplication/useCases'

type HTTPDetailOrderInput = {
  params: any,
  headers?: any,
  body: any
}

export default class HTTPGenerateOrderController {
  private _input: HTTPDetailOrderInput;
  private _generateOrderInteractor: GenerateOrder.GenerateOrderInteractor

  constructor(input: HTTPDetailOrderInput, interactor: GenerateOrder.GenerateOrderInteractor) {
    this._input = input;
    this._generateOrderInteractor = interactor;
  }

  async run() {
    const request: GenerateOrder.GenerateOrderRequestDTO = {
      customerId: this._input.body.customer_id,
      items: this._input.body.items,
      billingAddress: this._input.body.billing_address,
      shouldConsiderCustomerAddressForBilling: this._input.body.use_customer_address
    };

    await this._generateOrderInteractor.execute(request);
  }
};
