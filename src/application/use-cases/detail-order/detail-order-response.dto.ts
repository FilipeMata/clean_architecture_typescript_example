import { AddressDTO } from '@aplication/dtos';

export interface DetailOrderResponseProductDTO {
  id: string,
  name: string,
  description: string,
  price: number
};

export interface DetailOrderResponseCustomerDTO {
  id: string,
  document: string;
  name: string;
  cellphone: string;
  email: string;
  birthdate: Date;
}

export interface DetailOrderResponseLineItemDTO {
  id: string,
  product: DetailOrderResponseProductDTO,
  quantity: number
};

export interface DetailOrderResponseChargeDTO {
  id: string;
  paymentMethod: string;
  status: string;
};

interface DetailOrderSuccess {
  id: string,
  billingAddress: AddressDTO,
  lineItems: Array<DetailOrderResponseLineItemDTO>
  customer: DetailOrderResponseCustomerDTO,
  charge?: DetailOrderResponseChargeDTO
};

interface DetailOrderFailures {
  invalidOrderId?: boolean
}

export interface DetailOrderResponseDTO {
  success?: DetailOrderSuccess,
  failures?: DetailOrderFailures
};

