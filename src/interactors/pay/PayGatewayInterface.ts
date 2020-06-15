import { Product } from '@entities/Product';
import { ProcessPaymentInputModel } from '@interactors/pay/PayGatewayModels';
import { InvoiceInputModel } from '@interactors/pay/PayGatewayModels';

interface PayGatewayInterface {
    startProcess(): void;
    getProductById(id: number): Product;
    processPayment(data: ProcessPaymentInputModel): number;
    createInvoice(data: InvoiceInputModel): void;
    finishProcess(): void;
    rollbackProcess(): void;
}

export { PayGatewayInterface };
