
import { IInvoiceRepository } from './entityGatewayInterfaces/IInvoiceRepository';
import { IProductRepository } from './entityGatewayInterfaces/IProductRepository';
import { ILineItemRepository } from './entityGatewayInterfaces/ILineItemRepository';
import { ICustomerRepository } from './entityGatewayInterfaces/ICustomerRepository';
import { Result } from '../shared/Result';
import { LineItem } from '@entities/LineItem';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { Invoice } from '@entities/Invoice';
import { Address } from '@entities/Address';

interface LineItemRequestDTO {
  productId: string,
  quantity: number
};

interface AddressRequestDTO {
  street: string;
  neighborhood: string;
  number: string;
  state: string;
  country: string;
  complement: string;
  zipcode: string;
};

interface GenerateInvoiceUseCaseRequestDTO {
  items: Array<LineItemRequestDTO>,
  customerId: string,
  billingAddress?: AddressRequestDTO,
  shouldConsiderCustomerAddressForBilling?: boolean
};

class GenerateInvoiceUseCase {
  private invoiceRep: IInvoiceRepository;
  private productRep: IProductRepository;
  private lineItemRep: ILineItemRepository;
  private customerRep: ICustomerRepository;

  constructor(
    invoiceRep: IInvoiceRepository,
    productRep: IProductRepository,
    lineItemRep: ILineItemRepository,
    customerRep: ICustomerRepository
  ) {
    this.invoiceRep = invoiceRep;
    this.productRep = productRep;
    this.lineItemRep = lineItemRep;
    this.customerRep = customerRep;
  }

  public async execute(data: GenerateInvoiceUseCaseRequestDTO): Promise<Result<void>> {

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

export { GenerateInvoiceUseCase };