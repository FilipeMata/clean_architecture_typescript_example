import { OrderData, InvoiceData } from '@useCases/common/dtos'

export default interface InvoiceService {
  generateInvoice(orderData: OrderData): Promise<InvoiceData>
}

export class InvoiceGateway implements InvoiceService {
  private _invoiceService: InvoiceService;

  constructor(invoiceService: InvoiceService) {
    this._invoiceService = invoiceService
  }

  public async generateInvoice(orderData: OrderData): Promise<InvoiceData> {
    return this._invoiceService.generateInvoice(orderData);
  }
}