import { Customer, UniqueEntityID } from '@entities';
import { CustomerDataMapper } from '../interfaces/data-mappers';
import { toDomain } from '../models/customer-persistence-data';

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function MixCustomerRepository<TBase extends GConstructor>(Gateway: TBase) {
  
  return class CustomerRepository extends Gateway {

    private _customerDataMapper: CustomerDataMapper

    constructor(...args: any[]) {
      super(...args);
      this._customerDataMapper = args[0].customerDataMapper;
    }

    public async findCustomerById(customerId: UniqueEntityID): Promise<Customer> {
      const customerPersistenceData = await this._customerDataMapper.findById(+customerId.toValue())
      return toDomain(customerPersistenceData);
    }
  }
}
