import { AddressDTO } from '@aplication/dtos';

export interface DetailOrderResponseProductDTO {
  name: string,
  description: string,
  price: number
};

export interface DetailOrderResponseCustomerDTO {
  document: string;
  name: string;
  cellphone: string;
  email: string;
}

export interface DetailOrderResponseLineItemDTO {
  product: DetailOrderResponseProductDTO,
  quantity: number
};

export interface DetailOrderResponseChargeDTO {
  number: string;
  paymentMethod: string;
  status: string;
};

interface DetailOrderSuccess {
  id: string,
  billingAddress: AddressDTO,
  lineItems: Array<DetailOrderResponseLineItemDTO>
  buyer: DetailOrderResponseCustomerDTO,
  charge?: DetailOrderResponseChargeDTO
};

interface DetailOrderFailures {
  invalidOrderId?: boolean
}

export interface DetailOrderResponseDTO {
  success?: DetailOrderSuccess,
  failures?: DetailOrderFailures
};

