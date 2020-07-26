import RepositoryMapper from './repository.mapper';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { Invoice } from '../../entities/invoice';
import { Charge } from '../../entities/charge';
import { Address, IAddressProps, LineItem } from '@entities';
import { sequelizeLineItemMapper } from './sequelize-line-item.mapper';

export const sequelizeInvoiceMapper: RepositoryMapper<Invoice> = {
  toDomain(invoiceRowDTO: any): Invoice {
    const chargeProps = {
      paymentMethod: invoiceRowDTO.payment_method,
      status: invoiceRowDTO.charge_status
    };

    const chargeId = new UniqueEntityID(invoiceRowDTO.charge_id);
    const addressProps: IAddressProps = invoiceRowDTO.billing_address;

    let lineItems: Array<LineItem> = [];

    if (invoiceRowDTO.line_items) {
      lineItems = invoiceRowDTO.line_items.map((lineItem: any) => {
        return sequelizeLineItemMapper.toDomain(lineItem);
      })
    }

    const InvoiceProps = {
      billingAddress: Address.build(addressProps).value,
      customerId: new UniqueEntityID(invoiceRowDTO.customer_id),
      lineItems: lineItems,
      charge: invoiceRowDTO.charge_id ? Charge.build(chargeProps, chargeId).value : undefined
    };

    const invoiceId = new UniqueEntityID(invoiceRowDTO.id);
    return Invoice.build(InvoiceProps, invoiceId).value;
  },

  toPersistence(invoice: Invoice): any {
    return {
      id: invoice.id.toValue(),
      customer_id: invoice.customerId.toValue(),
      charge_id: invoice.charge ? invoice.charge.id.toValue() : null,
      payment_method: invoice.charge ? invoice.charge.paymentMethod : null,
      charge_status: invoice.charge ? invoice.charge.status : null,
      billing_address: invoice.billingAddress.toValue()
    }
  }
}