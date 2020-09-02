import { Customer, UniqueEntityID } from '@entities';
import GatewayDecorator from './gateway-decorator';

export default class CustomerDecorator extends GatewayDecorator {
  public async findCustomerById(customerId: UniqueEntityID): Promise<Customer> {
    const customer = await this.abstractFind('Customer', customerId);
    return customer as Customer;
  }
}