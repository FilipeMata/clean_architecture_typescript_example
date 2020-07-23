import InvoiceRepository from '@aplication/gateways/invoice.rep';
import CustomerRepository from '@aplication/gateways/customer.rep';

import { LineItem } from '@entities/line-item';
import { Invoice } from '@entities/invoice';
import { Address } from '@entities/address';

import { Result } from '@shared/Result';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import GenerateInvoiceRequestDTO from './generate-invoice-request.dto';

class GenerateInvoiceInteractor {
  private invoiceRep: InvoiceRepository;
  private customerRep: CustomerRepository;

  constructor(
    invoiceRep: InvoiceRepository,
    customerRep: CustomerRepository
  ) {
    this.invoiceRep = invoiceRep;
    this.customerRep = customerRep;
  }

  public async execute(data: GenerateInvoiceRequestDTO): Promise<Result<void>> {

    let billingAddress: Address | undefined;

    if(!!data.billingAddress) {
      const billingAddressOrError = Address.build(data.billingAddress);
      
      if(!billingAddressOrError.succeeded) {
        return Result.fail<void>(billingAddressOrError.errors);
      }

      billingAddress = billingAddressOrError.value;
    }

    const customer = await this.customerRep
      .getCustomerById(data.customerId);

    if (!customer) {
      return Result.fail<void>(`Couldn't find customer`)
    }

    if (data.shouldConsiderCustomerAddressForBilling) {
      billingAddress = customer.address;
    }

    if (!billingAddress) {
      return Result.fail<void>(`Invoice billing address is required`);
    }

    const invoiceResult = Invoice.build({
      billingAddress: billingAddress,
      customerId: customer.id
    });

    if (!invoiceResult.succeeded) {
      return Result.fail<void>(invoiceResult.errors);
    }

    const invoice = invoiceResult.value;

    for (const item of data.items) {

      let lineItemResult = LineItem.build({
        productId: new UniqueEntityID(item.productId),
        quantity: item.quantity
      });

      if (!lineItemResult.succeeded){
        return Result.fail<void>(lineItemResult.errors);
      }

      let lineItem = lineItemResult.value;

      invoice.addLineItem(lineItem);
    }

    await this.invoiceRep.save(invoice);

    return Result.success<void>();
  }

}

export { GenerateInvoiceInteractor };