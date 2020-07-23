import { Product } from '@entities/product';
import { Charge } from '@entities/charge';

import AddressDTO from '@useCases/dtos/address.dto';
import CustomerDTO from '@useCases/dtos/customer.dto';

export interface ItemDTO {
  productName: string,
  productPrice: number,
  productQuantity: number
};

export interface GenerateChargeDTO {
  billingAddress: AddressDTO,
  customer: CustomerDTO,
  items: Array<ItemDTO>
}

export interface ThirdPartyPaymentService {
  generateCharge(request: GenerateChargeDTO): Promise<Charge>;
  cancelCharge(charge: Charge): Promise<void>
}