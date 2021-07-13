import { AddressProps } from '@entities';

interface ProductDTO {
  name: string,
  description: string,
  price: number
};

interface CustomerDTO {
  document: string;
  name: string;
  cellphone: string;
  email: string;
  birthdate: string;
}

interface LineItemDTO {
  product: ProductDTO,
  quantity: number
};

export default interface OrderData {
  id: string,
  billingAddress: AddressProps,
  lineItems: Array<LineItemDTO>
  buyer: CustomerDTO
};