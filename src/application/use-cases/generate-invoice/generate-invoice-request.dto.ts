import { AddressDTO, LineItemDTO } from '@aplication/dtos';

export default interface GenerateInvoiceRequestDTO {
  items: Array<LineItemDTO>,
  customerId: string,
  billingAddress?: AddressDTO,
  shouldConsiderCustomerAddressForBilling?: boolean
};