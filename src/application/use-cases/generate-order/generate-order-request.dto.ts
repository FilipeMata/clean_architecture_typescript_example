import { AddressDTO } from '@aplication/dtos';

interface LineItemDTO {
  productId: string,
  quantity: number
};

export interface GenerateOrderRequestDTO {
  items: Array<LineItemDTO>,
  customerId: string,
  billingAddress?: AddressDTO,
  shouldConsiderCustomerAddressForBilling?: boolean
};