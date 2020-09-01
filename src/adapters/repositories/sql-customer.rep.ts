import { Customer, UniqueEntityID } from '@entities';
import { SQLBaseRepository, SQLRepositoryProps } from './sql-base.rep';
import sqlCustomerMapper from '../mappers/old/sql-customer.mapper.old';
import { Connections } from './sql-models';

export default class SQLCustomerRepository extends SQLBaseRepository<Customer> {

  constructor(db: Connections) {
    const props: SQLRepositoryProps<Customer> = {
      dbName: 'store',
      modelName: 'customer',
      mapper: sqlCustomerMapper,
    };

    super(props, db);
  }

  async findCustomerById(customerId: UniqueEntityID): Promise<Customer> {
    return this._getBy({
      id: customerId.toValue()
    })
  }
}
