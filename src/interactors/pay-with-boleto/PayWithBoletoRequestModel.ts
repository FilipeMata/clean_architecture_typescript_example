import { PaymentInputModel } from '@interactors/pay/PayRequestModels';

interface BoletoInputModel extends PaymentInputModel {
    expirationDate: Date;
    interest: number;
    fine: number;
}

export { BoletoInputModel }