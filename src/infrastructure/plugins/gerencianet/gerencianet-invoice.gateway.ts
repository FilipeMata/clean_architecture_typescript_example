import { InvoiceGateway } from '@adapters/common/services/invoice.service';
import { Invoice } from '@entities';
import { OrderData } from '@useCases/common/get-order-data';

const Gerencianet = require('gn-api-sdk-node');
const credentials = require('./credentials');

export default class GerencianetInvoiceGateway implements InvoiceGateway {
  public async generateInvoice(orderData: OrderData): Promise<Invoice> {
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
          expire_at: '2024-10-30',
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
          number: data.charge_id,
          url: data.link
        }
      })
      .catch((err: any) => {
        console.log(err);
        throw new Error('fail_to_generate_invoice');
      });
  }
}