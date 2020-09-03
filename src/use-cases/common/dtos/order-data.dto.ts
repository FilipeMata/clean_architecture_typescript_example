import { AddressDTO } from '@useCases/common/dtos';

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
}

interface LineItemDTO {
  product: ProductDTO,
  quantity: number
};

export interface OrderData {
  id: string,
  billingAddress: AddressDTO,
  lineItems: Array<LineItemDTO>
  buyer: CustomerDTO
};