import { Customer, UniqueEntityID } from '@entities';
import { Repository } from './base-repository';

export default function FindableCustomer<TBase extends Repository>(Base: TBase) {
  return class CustomerRepository extends Base {
    public async findCustomerById(customerId: UniqueEntityID): Promise<Customer> {
      const customer = await this.abstractFind('Customer', customerId);
      return customer as Customer;
    }
  }
}
