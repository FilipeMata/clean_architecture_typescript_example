import InvoiceRepository from '@aplication/gateways/invoice.rep';
import { DetailInvoiceInputPort } from '@aplication/useCases/detail-invoice/detail-invoice.interactor'; 

import { GenerateChargeDTO, ThirdPartyPaymentService } from '@aplication/gateways/thrid-party-payment.service';

import { Result } from '@shared/Result';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { Invoice } from '@entities/invoice';
import { Address } from '@entities/address';
import { LineItem } from '@entities/line-item';


class ChargeInvoiceInteractor {
  private invoiceRep: InvoiceRepository;
  private thirdPartyPaymentGateway: ThirdPartyPaymentService,
  private detailInvoiceInteractor: DetailInvoiceInputPort;

  constructor(
    invoiceRep: InvoiceRepository,
    thirdPartyPaymentGateway: ThirdPartyPaymentService,
    detailInvoiceInteractor: DetailInvoiceInputPort
  ) {
    this.invoiceRep = invoiceRep;
    this.thirdPartyPaymentGateway = thirdPartyPaymentGateway;
    this.detailInvoiceInteractor = detailInvoiceInteractor;
  }

  public async execute(invoiceId: string): Promise<Result<void>> {
    const invoiceResult = await this.detailInvoiceInteractor
      .execute(invoiceId);

    if(!invoiceResult.succeeded) {
      return Result.fail<void>(invoiceResult.errors);
    }

    const invoiceDTO = invoiceResult.value;
    
    const invoice = Invoice.build({
      billingAddress: Address.build(invoiceDTO.billingAddress).value,
      customerId: new UniqueEntityID(invoiceDTO.customer.id),
    }, new UniqueEntityID(invoiceDTO.id)).value;

    const generateChargeItemDTO = [];

    for (const item of invoiceDTO.lineItems) {

      generateChargeItemDTO.push({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      });

      const lineItem = LineItem.build({
        productId: new UniqueEntityID(item.product.id),
        quantity: item.quantity
      }, new UniqueEntityID(item.id)).value;

      invoice.addLineItem(lineItem);
    }

    if (!!invoiceDTO.charge) {
      Result.fail<void>('Charge already exists for invoice');
    }

    
    const generateChargeDTO: GenerateChargeDTO = {
      billingAddress: invoice.billingAddress.toValue(),
      customer: {
        document: invoiceDTO.customer.document,
        name: invoiceDTO.customer.name,
        cellphone: invoiceDTO.customer.cellphone,
        email: invoiceDTO.customer.email,
        birthdate: invoiceDTO.customer.birthdate
      },
      items: generateChargeItemDTO
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
