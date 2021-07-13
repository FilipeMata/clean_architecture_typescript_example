import { Customer, UniqueEntityID } from '@entities';
import CustomerPersistenceData, { toDomain } from '../types/customer-persistence-data';
import { DataMapper } from '../types/data-mapper';
import { Criteria } from '../types/criteria';

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function MixCustomerRepository<TBase extends GConstructor>(Gateway: TBase) {
  
  return class CustomerRepository extends Gateway {

    private _customerDataMapper: DataMapper<CustomerPersistenceData>

    constructor(...args: any[]) {
      super(...args);
      this._customerDataMapper = args[0].customerDataMapper;
    }

    public async findCustomerById(customerId: UniqueEntityID): Promise<Customer> {
      const criteria = new Criteria<CustomerPersistenceData>({
        id: {
          $equal: +customerId.toValue()
        }
      });

      const customerPersistenceData = await this._customerDataMapper.find({ criteria })

      return toDomain(customerPersistenceData);
    }
  }
}
