import { DetailInvoiceResponseDTO } from './detail-invoice-response.dto';
import * as DetailInvoiceMapper from './detail-invoice.mapper';
import DetailInvoiceInputPort  from './detail-invoice.input';
import { UniqueEntityID } from '@entities';
import OutputPort from '../../output-port';
import DetailInvoiceGateway from './detail-invoice.gateway';

export default class DetailInvoiceInteractor implements DetailInvoiceInputPort {
  private _gateway: DetailInvoiceGateway;
  private _presenter: OutputPort<DetailInvoiceResponseDTO>;

  constructor(
    gateway: DetailInvoiceGateway,
    presenter: OutputPort<DetailInvoiceResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(invoiceId: string) {
    let response: DetailInvoiceResponseDTO = {};

    const invoice = await this._gateway
      .getInvoiceById(new UniqueEntityID(invoiceId));

    if (!invoice) {
      response.failures = {
        invalidInvoiceId: true
      };

      return this._presenter.show(response);
    }

    const itemsDTO = [];
    for (const lineItem of invoice.lineItems) {
      const product = await this._gateway
        .getProductById(lineItem.productId);

      const item = {
        id: lineItem.id.toString(),
        product: DetailInvoiceMapper.mapProductToDetailInvoiceResponseProductDTO(product),
        quantity: lineItem.quantity
      };

      itemsDTO.push(item);
    }

    const customer = await this._gateway
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

    return this._presenter.show(response);
  }
}


