import { Customer } from '@entities';
import { SequelizeBaseRepository, SequelizeRepositoryProps } from './sequelize-base.rep';
import { sequelizeCustomerMapper } from '../mappers/sequelize-customer.mapper';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
import { CustomerRepository } from '../../application/gateways/customer.rep';

export default class SequelizeCustomerRepository extends SequelizeBaseRepository<Customer> implements CustomerRepository {

  constructor() {
    const props: SequelizeRepositoryProps<Customer> = {
      dbName: 'store',
      modelName: 'customer',
      mapper: sequelizeCustomerMapper
    };

    super(props);
  }

  async getCustomerById(customerId: UniqueEntityID): Promise<Customer> {
    return this._getBy({
      id: customerId.toValue()
    })
  }

  async getCustomerByDocument(document: string): Promise<Customer> {
    return this._getBy({
      document: document
    })
  }
}
