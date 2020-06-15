import { Product } from '@entities/Product';
import { PaymentInputModel } from '@interactors/pay/PayRequestModels';
import { ProcessPaymentInputModel } from '@interactors/pay/PayGatewayModels';
import { InvoiceInputModel } from '@interactors/pay/PayGatewayModels';

class PayGatewayMapper {
    public mapToPaymentProcessInput<T extends PaymentInputModel, U extends ProcessPaymentInputModel>(requestModel: T, product: Product): U {
        
       let model = requestModel as any;
       delete model.productId;
       model.productName = product.name;
       model.productPrice = product.price;
       model.productDescription = product.description;

       return model as U;
    }

    public mapToInvoiceCreationInput(requestModel: PaymentInputModel, protocol: number, product: Product): InvoiceInputModel {
        const invoiceCreationInput: InvoiceInputModel = {
            clientName: requestModel.clientName,
            birthdate: requestModel.birthdate,
            email: requestModel.email,
            cellphone: requestModel.cellphone,
            document: requestModel.document,
            street: requestModel.street,
            neighborhood: requestModel.neighborhood,
            city: requestModel.city,
            state: requestModel.state,
            country: requestModel.country,
            zipcode: requestModel.zipcode,
            complement: requestModel.complement,
            number: requestModel.number,
            protocol: protocol,
            productId: product.id,
            status: 'waiting',
            value: product.price
        };

        return invoiceCreationInput;
    };
}

export { PayGatewayMapper };