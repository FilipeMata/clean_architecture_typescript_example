import { InvoiceGateway } from '@adapters/common/services/invoice.service';
import { InvoiceData } from '../../../use-cases/common/dtos/invoice-data.dto';
import { OrderData } from '../../../use-cases/common/dtos/order-data.dto';

const Gerencianet = require('gn-api-sdk-node');
const credentials = require('./credentials');

export class GerencianetInvoiceGateway implements InvoiceGateway {
  public async generateInvoice(orderData: OrderData): Promise<InvoiceData> {
    const options = {
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      sandbox: credentials.sandbox
    }
    
    const items = orderData.lineItems.map((item) => {
      return {
        name: item.product.name,
        value: item.product.price,
        amount: item.quantity
      };
    });

    const body = {
      payment: {
        banking_billet: {
          expire_at: '2020-10-30',
          customer: {
            name: orderData.buyer.name,
            email: orderData.buyer.email,
            cpf: orderData.buyer.document,
            birth: orderData.buyer.birthdate,
            phone_number: `${orderData.buyer.cellphone}`
          }
        }
      },
      items: items
    }
    
    var gerencianet = new Gerencianet(options);
    
    return gerencianet
      .oneStep([], body)
      .then(function (data: any) {
        data = data.data;
        
        return {
          invoiceNumber: data.charge_id,
          invoiceUrl: data.link
        }
      })
      .catch((err: any) => {
        console.log(err);
        throw new Error('fail_to_generate_invoice');
      });
  }
}