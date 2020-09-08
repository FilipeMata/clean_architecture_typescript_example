import { OrderData, InvoiceData } from '@useCases/common/dtos'

export interface InvoiceGateway {
  generateInvoice(orderData: OrderData): Promise<InvoiceData>
}

export default class InvoiceService implements InvoiceGateway {
  private _invoiceService: InvoiceGateway;

  constructor(invoiceService: InvoiceGateway) {
    this._invoiceService = invoiceService
  }

  public async generateInvoice(orderData: OrderData): Promise<InvoiceData> {
    return this._invoiceService.generateInvoice(orderData);
  }
}