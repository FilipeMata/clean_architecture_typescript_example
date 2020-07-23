
import InvoiceRepository from '@useCases/gateways/invoice.rep';
import CustomerRepository from '@useCases/gateways/customer.rep';
import ProductRepository from '@useCases/gateways/product.rep';

import { ItemDTO, GenerateChargeDTO, ThirdPartyPaymentService} from '@useCases/gateways/thrid-party-payment.service';

import { Result } from '@shared/Result';

class ChargeInvoiceInteractor {
  private invoiceRep: InvoiceRepository;
  private customerRep: CustomerRepository;
  private productRep: ProductRepository;
  private thirdPartyPaymentGateway: ThirdPartyPaymentService;

  constructor(
    invoiceRep: InvoiceRepository,
    customerRep: CustomerRepository,
    productRep: ProductRepository,
    thirdPartyPaymentGateway: ThirdPartyPaymentService
  ) {
    this.invoiceRep = invoiceRep;
    this.customerRep = customerRep;
    this.productRep = productRep;
    this.thirdPartyPaymentGateway = thirdPartyPaymentGateway;
  }

  public async execute(invoiceId: string): Promise<Result<void>> {

    const invoice = await this.invoiceRep
      .getInvoiceById(invoiceId);

    if (!invoice) {
      return Result.fail<void>('Could not find invoice');
    }

    const customer = await this.customerRep
      .getCustomerById(invoice.customerId);

    const items: Array<ItemDTO> = [];

    for (const lineItem of invoice.lineItems) {
      const product = await this.productRep
        .getProductById(lineItem.productId.toString());

      const item: ItemDTO = {
        productName: product.name,
        productPrice: product.price,
        productQuantity: lineItem.quantity
      };

      items.push(item);
    }

    const generateChargeDTO: GenerateChargeDTO = {
      billingAddress: invoice.billingAddress.toValue(),
      customer: {
        document: customer.document,
        name: customer.name,
        cellphone: customer.cellphone,
        email: customer.email,
        birthdate: customer.birthdate
      },
      items: items
    }

    let charge;
    try {
      charge = await this.thirdPartyPaymentGateway
        .generateCharge(generateChargeDTO);
    } catch(err) {
      return Result.fail<void>(err.message);
    }

    invoice.linkCharge(charge);

    await this.invoiceRep.save(invoice);

    return Result.success<void>();
  }

}

export { ChargeInvoiceInteractor };