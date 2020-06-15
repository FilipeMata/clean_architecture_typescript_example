
import { ProcessPaymentInputModel } from '@interactors/pay/PayGatewayModels';

interface ProcessBoletoInputModel extends ProcessPaymentInputModel {
    expirationDate: Date;
    interest: number;
    fine: number;
}

export { ProcessBoletoInputModel }