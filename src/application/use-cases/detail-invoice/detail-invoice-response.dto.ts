import { AddressDTO } from '@aplication/dtos';

export interface DetailInvoiceResponseProductDTO {
  id: string,
  name: string,
  description: string,
  price: number
};

export interface DetailInvoiceResponseCustomerDTO {
  id: string,
  document: string;
  name: string;
  cellphone: string;
  email: string;
  birthdate: Date;
}

export interface DetailInvoiceResponseLineItemDTO {
  id: string,
  product: DetailInvoiceResponseProductDTO,
  quantity: number
};

export interface DetailInvoiceResponseChargeDTO {
  id: string;
  paymentMethod: string;
  status: string;
};

interface DetailInvoiceSuccess {
  id: string,
  billingAddress: AddressDTO,
  lineItems: Array<DetailInvoiceResponseLineItemDTO>
  customer: DetailInvoiceResponseCustomerDTO,
  charge?: DetailInvoiceResponseChargeDTO
};

interface DetailInvoiceFailures {
  invalidInvoiceId?: boolean
}

export interface DetailInvoiceResponseDTO {
  success?: DetailInvoiceSuccess,
  failures?: DetailInvoiceFailures
};

