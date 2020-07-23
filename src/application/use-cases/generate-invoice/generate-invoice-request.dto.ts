import AddressDTO from '../dtos/address.dto';
import LineItemDTO from '@useCases/dtos/line-item.dto';

export default interface GenerateInvoiceRequestDTO {
  items: Array<LineItemDTO>,
  customerId: string,
  billingAddress?: AddressDTO,
  shouldConsiderCustomerAddressForBilling?: boolean
};