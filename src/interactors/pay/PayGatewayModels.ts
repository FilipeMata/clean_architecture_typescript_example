
import { ClientInputModel } from '@shared/Models';

interface ProductInputModel {
    productName: string;
    productDescription: string;
    productPrice: number;
}

interface ProcessPaymentInputModel extends ProductInputModel, ClientInputModel {};

interface InvoiceInputModel extends ClientInputModel {
    protocol: number;
    value: number;
    status: string;
    productId: number;
}

export { ProcessPaymentInputModel, InvoiceInputModel}