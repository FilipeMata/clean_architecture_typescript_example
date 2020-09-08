import { Gateways } from '@adapters';

const Gerencianet = require('gn-api-sdk-node');
const credentials = require('./credentials');

export class GerencianetInvoiceGateway implements Gateways.InvoiceGateway {
  public async generateInvoice(orderData: Gateways.OrderData): Promise<Gateways.InvoiceData> {
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
          expire_at: '2019-08-30',
          customer: {
            name: orderData.buyer.name,
            email: orderData.buyer.email,
            cpf: orderData.buyer.document,
            birth: orderData.buyer.birthdate,
            phone_number: orderData.buyer.cellphone
          }
        }
      },
      items: items
    }
    
    var gerencianet = new Gerencianet(options);
    
    return gerencianet
      .oneStep([], body)
      .then((data: any) {
        console.log(data);
        return {
          invoiceNumber: data.charge_id,
          invoiceUrl: data.link;
        }
      })
      .catch((err: any) => {
        console.log(err);
        throw new Error('fail_to_generate_invoice');
      });
  }
}