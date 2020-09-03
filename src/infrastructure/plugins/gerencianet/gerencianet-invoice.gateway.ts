import { Gateways } from '@adapters';

const Gerencianet = require('gn-api-sdk-node');
const credentials = require('./credentials');

export class GerencianetInvoiceGateway implements Gateways.InvoiceGateway {
  public async generateInvoice(orderData: Gateways.OrderData): Promise<Gateways.InvoiceData> {
    var options = {
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      sandbox: credentials.sandbox
    }
    
    var body = {
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
    
      items: [{
        name: 'Product 1',
        value: 1000,
        amount: 2
      }],
      shippings: [{
        name: 'Default Shipping Cost',
        value: 100
      }]
    }
    
    var gerencianet = new Gerencianet(options);
    
    gerencianet
      .oneStep([], body)
      .then(console.log)
      .catch(console.log)
      .done();
  }
}