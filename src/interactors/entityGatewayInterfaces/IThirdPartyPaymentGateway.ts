import { Product } from '@entities/Product';
import { Charge } from '@entities/Charge';

interface generateChargeRequestDTO {

};

export interface IThirdPartyPaymentGateway {
  generateCharge(request: generateChargeRequestDTO): Promise<Charge>;
  cancelCharge(charge: Charge): Promise<void>
}