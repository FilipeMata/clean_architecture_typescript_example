import { PaymentInputModel } from '@interactors/pay/PayRequestModels';
import { PayGatewayInterface } from '@interactors/pay/PayGatewayInterface';
import { PayGatewayMapper } from '@interactors/pay/PayGatewayMapper';

abstract class PayUseCaseAbstract<G extends PayGatewayInterface> {
    protected gateway: G;
    protected mapper: PayGatewayMapper;

    constructor(gateway: G) {
        this.gateway = gateway;
        this.mapper = new PayGatewayMapper();
    }

    protected async processPayment<T extends PaymentInputModel>(data: T) {
        const product = await this.gateway.getProductById(data.productId);
        const paymentProcessInput = this.mapper.mapToPaymentProcessInput(data, product);
        
        try {
            await this.gateway.startProcess();
            const protocol = await this.gateway.processPayment(paymentProcessInput);
            const invoiceCreationInput = this.mapper.mapToInvoiceCreationInput(data, protocol, product);
            await this.gateway.createInvoice(invoiceCreationInput);
            this.gateway.finishProcess();
        } catch(err) {
            this.gateway.rollbackProcess();
            throw new Error("Failed to process payment");
        }
    }

    public abstract execute(data: PaymentInputModel): void;
}

export { PayUseCaseAbstract };