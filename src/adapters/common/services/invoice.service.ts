import { OrderData, InvoiceData } from '@useCases/common/dtos'

type GConstructor<T = {}> = new (...args: any[]) => T;

export interface InvoiceGateway {
  generateInvoice(orderData: OrderData): Promise<InvoiceData>
}

export default function MixInvoiceService<TBase extends GConstructor>(Base: TBase) {
  return class InvoiceService extends Base implements InvoiceGateway {
    private _invoiceGateway: InvoiceGateway;

    constructor(...args: any[]) {
      super(...args);
      this._invoiceGateway = args[0].invoiceGateway;
    }

    public async generateInvoice(orderData: OrderData): Promise<InvoiceData> {
      return this._invoiceGateway.generateInvoice(orderData);
    }
  }
}