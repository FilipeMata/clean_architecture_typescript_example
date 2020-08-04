import { AddressDTO, LineItemDTO } from '@aplication/dtos';

export default interface GenerateOrderRequestDTO {
  items: Array<LineItemDTO>,
  customerId: string,
  billingAddress?: AddressDTO,
  shouldConsiderCustomerAddressForBilling?: boolean
};