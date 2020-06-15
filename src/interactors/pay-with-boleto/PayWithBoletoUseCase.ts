import { PayUseCaseAbstract } from '@interactors/pay/PayUseCaseAbstract';
import { BoletoInputModel } from '@interactors/pay-with-boleto/PayWithBoletoRequestModel';
import { PayWithBoletoGatewayInterface } from '@interactors/pay-with-boleto/PayWithBoletoGatewayInterface'
import { PayGatewayInterface } from '@interactors/pay/PayGatewayInterface';

class PayWithBoletoUseCase extends PayUseCaseAbstract<PayWithBoletoGatewayInterface>{
    constructor(gateway: PayGatewayInterface) {
        super(gateway)
    }

    public async execute(data: BoletoInputModel): Promise<void> {
        const today = new Date();

        if(data.expirationDate < today) {
            throw 'Invalid experitation date';
        }

        if(data.fine > 500) {
            throw 'Fine must be lower than R$ 5.00';
        }

        if(data.interest > 2) {
            throw 'Interest must be lower than 2%';
        }

        this.gateway.processPayment
        await this.processPayment(data);
    }
}

export { PayWithBoletoUseCase };