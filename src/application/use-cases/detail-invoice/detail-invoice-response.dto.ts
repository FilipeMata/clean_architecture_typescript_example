import AddressDTO from '../dtos/address.dto';

interface ProductDTO {
  id: string,
  name: string,
  description: string,
  price: number
};

interface CustomerDTO {
  id: string,
  document: string;
  name: string;
  cellphone: string;
  email: string;
  birthdate: Date;
}

interface LineItemDTO {
  id: string,
  product: ProductDTO,
  quantity: number
};

interface chargeDTO {
  id: string;
  paymentMethod: string;
  status: string;
};

export default interface DetailInvoiceResponseDTO {
  id: string,
  billingAddress: AddressDTO,
  lineItems: Array<LineItemDTO>
  customer: CustomerDTO,
  charge?: chargeDTO
};

