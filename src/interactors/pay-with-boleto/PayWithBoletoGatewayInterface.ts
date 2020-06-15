import { PayGatewayInterface } from '@interactors/pay/PayGatewayInterface';
import { ProcessBoletoInputModel } from '@interactors/pay-with-boleto/PayWithBoletoGatewayModels';

interface PayWithBoletoGatewayInterface extends PayGatewayInterface {
    processPayment(data: ProcessBoletoInputModel): number;
}

export { PayWithBoletoGatewayInterface };