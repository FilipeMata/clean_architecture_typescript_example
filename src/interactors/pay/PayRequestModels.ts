import { ClientInputModel } from '@shared/Models';

interface PaymentInputModel extends ClientInputModel {
    productId: number;
}
export { PaymentInputModel }