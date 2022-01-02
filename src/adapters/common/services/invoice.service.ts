import { Invoice } from "@entities";
import { OrderData } from "@useCases/common/get-order-data";


type GConstructor<T = {}> = new (...args: any[]) => T;

export interface InvoiceGateway {
  generateInvoice(orderData: OrderData): Promise<Invoice>
}

export default function MixInvoiceService<TBase extends GConstructor>(Gateway: TBase) {
  return class InvoiceService extends Gateway implements InvoiceGateway {
    private _invoiceGateway: InvoiceGateway;

    constructor(...args: any[]) {
      super(...args);
      this._invoiceGateway = args[0].invoiceGateway;
    }

    public async generateInvoice(orderData: OrderData): Promise<Invoice> {
      return this._invoiceGateway.generateInvoice(orderData);
    }
  }
}