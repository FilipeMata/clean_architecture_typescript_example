import { Customer, Product, Charge } from '@entities';
import { DetailOrderResponseCustomerDTO, DetailOrderResponseProductDTO, DetailOrderResponseChargeDTO } from './detail-order-response.dto';

export function mapCustomerToDetailOrderResponseCustomerDTO(customer: Customer): DetailOrderResponseCustomerDTO {
  return {
    id: customer.id.toString(),
    document: customer.document,
    name: customer.name,
    cellphone: customer.cellphone,
    email: customer.email,
    birthdate: customer.birthdate
  };
}

export function mapProductToDetailOrderResponseProductDTO(product: Product): DetailOrderResponseProductDTO {
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description,
    price: product.price
  };
}

export function mapChargeToDetailOrderResponseChargeDTO(charge: Charge): DetailOrderResponseChargeDTO {
  return {
    id: charge.id.toString(),
    paymentMethod: charge.paymentMethod,
    status: charge.status
  };
}