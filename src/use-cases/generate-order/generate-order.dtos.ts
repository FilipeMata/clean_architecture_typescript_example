import { AddressProps, LineItemBasicBuildProps } from '@entities';

export default interface GenerateOrderRequestDTO {
  items: Array<LineItemBasicBuildProps>,
  customerId: string,
  billingAddress?: AddressProps,
  shouldConsiderCustomerAddressForBilling?: boolean
};
