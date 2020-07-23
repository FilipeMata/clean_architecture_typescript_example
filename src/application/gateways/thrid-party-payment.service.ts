import { Charge } from '@entities/charge';

import AddressDTO from '@aplication/dtos/address.dto';
import CustomerDTO from '@aplication/dtos/customer.dto';

export interface ItemDTO {
  name: string,
  price: number,
  quantity: number
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