import * as Gateways from '@aplication/gateways';

import { DetailInvoiceResponseDTO } from './detail-invoice-response.dto';
import * as DetailInvoiceMapper from './detail-invoice.mapper';
import DetailInvoiceInputPort  from './detail-invoice.input';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import OutputPort from '../../output-port';

export default class DetailInvoiceInteractor implements DetailInvoiceInputPort {
  private invoiceRep: Gateways.InvoiceRepository;
  private customerRep: Gateways.CustomerRepository;
  private productRep: Gateways.ProductRepository;
  private presenter: OutputPort<DetailInvoiceResponseDTO>;

  constructor(
    invoiceRep: Gateways.InvoiceRepository,
    customerRep: Gateways.CustomerRepository,
    productRep: Gateways.ProductRepository,
    presenter: OutputPort<DetailInvoiceResponseDTO>
  ) {
    this.invoiceRep = invoiceRep;
    this.customerRep = customerRep;
    this.productRep = productRep;
    this.presenter = presenter;
  }

  public async execute(invoiceId: string) {
    let response: DetailInvoiceResponseDTO = {};

    const invoice = await this.invoiceRep
      .getInvoiceById(new UniqueEntityID(invoiceId));

    if (!invoice) {
      response.failures = {
        invalidInvoiceId: true
      };

      return this.presenter.show(response);
    }

    const itemsDTO = [];
    for (const lineItem of invoice.lineItems) {
      const product = await this.productRep
        .getProductById(lineItem.productId);

      const item = {
        id: lineItem.id.toString(),
        product: DetailInvoiceMapper.mapProductToDetailInvoiceResponseProductDTO(product),
        quantity: lineItem.quantity
      };

      itemsDTO.push(item);
    }

    const customer = await this.customerRep
      .getCustomerById(invoice.customerId);

    response.success = {
      id: invoice.id.toString(),
      billingAddress: invoice.billingAddress.toValue(),
      lineItems: itemsDTO,
      customer: DetailInvoiceMapper.mapCustomerToDetailInvoiceResponseCustomerDTO(customer)
    };

    if (!!invoice.charge) {
      response.success.charge = DetailInvoiceMapper.mapChargeToDetailInvoiceResponseChargeDTO(invoice.charge)
    }

    return this.presenter.show(response);
  }
}


