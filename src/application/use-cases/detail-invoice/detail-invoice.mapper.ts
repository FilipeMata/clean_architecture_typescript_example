import { Customer, Product, Charge } from '@entities';
import { DetailInvoiceResponseCustomerDTO, DetailInvoiceResponseProductDTO, DetailInvoiceResponseChargeDTO } from './detail-invoice-response.dto';

export function mapCustomerToDetailInvoiceResponseCustomerDTO(customer: Customer): DetailInvoiceResponseCustomerDTO {
  return {
    id: customer.id.toString(),
    document: customer.document,
    name: customer.name,
    cellphone: customer.cellphone,
    email: customer.email,
    birthdate: customer.birthdate
  };
}

export function mapProductToDetailInvoiceResponseProductDTO(product: Product): DetailInvoiceResponseProductDTO {
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description,
    price: product.price
  };
}

export function mapChargeToDetailInvoiceResponseChargeDTO(charge: Charge): DetailInvoiceResponseChargeDTO {
  return {
    id: charge.id.toString(),
    paymentMethod: charge.paymentMethod,
    status: charge.status
  };
}