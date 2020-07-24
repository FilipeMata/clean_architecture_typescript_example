import { Charge } from '@entities';
import { AddressDTO, CustomerDTO } from '@aplication/dtos';

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