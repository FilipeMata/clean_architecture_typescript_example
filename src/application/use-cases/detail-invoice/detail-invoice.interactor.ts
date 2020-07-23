import InvoiceRepository from '@aplication/gateways/invoice.rep';
import CustomerRepository from '@aplication/gateways/customer.rep';
import ProductRepository from '@aplication/gateways/product.rep';

import { Result } from '@shared/Result';
import DetailInvoiceResponseDTO from './detail-invoice-response.dto';

export interface DetailInvoiceInputPort {
  execute(invoiceId: string): Promise<Result<DetailInvoiceResponseDTO>>
};


export class DetailInvoiceInteractor implements DetailInvoiceInputPort {
  private invoiceRep: InvoiceRepository;
  private customerRep: CustomerRepository;
  private productRep: ProductRepository;

  constructor(
    invoiceRep: InvoiceRepository,
    customerRep: CustomerRepository,
    productRep: ProductRepository,
  ) {
    this.invoiceRep = invoiceRep;
    this.customerRep = customerRep;
    this.productRep = productRep;
  }

  public async execute(invoiceId: string): Promise<Result<DetailInvoiceResponseDTO>> {

    const invoice = await this.invoiceRep
      .getInvoiceById(invoiceId);

    if (!invoice) {
      return Result.fail<DetailInvoiceResponseDTO>('Could not find invoice');
    }

    const customer = await this.customerRep
      .getCustomerById(invoice.customerId.toString());

    const customerDTO = {
      id: customer.id.toString(),
      document: customer.document,
      name: customer.name,
      cellphone: customer.cellphone,
      email: customer.email,
      birthdate: customer.birthdate
    };

    const itemsDTO = [];

    for (const lineItem of invoice.lineItems) {
      const product = await this.productRep
        .getProductById(lineItem.productId.toString());

      const item = {
        id: lineItem.id.toString(),
        product: {
          id: product.id.toString(),
          name: product.name,
          description: product.description,
          price: product.price
        },
        quantity: lineItem.quantity
      };

      itemsDTO.push(item);
    }

    let response: DetailInvoiceResponseDTO = {
      id: invoice.id.toString(),
      billingAddress: invoice.billingAddress.toValue(),
      lineItems: itemsDTO,
      customer: customerDTO
    };

    if (!!invoice.charge) {
      response.charge = {
        id: invoice.charge.id.toString(),
        paymentMethod: invoice.charge.paymentMethod,
        status: invoice.charge.status
      }
    }

    return Result.success<DetailInvoiceResponseDTO>(response);
  }
}


