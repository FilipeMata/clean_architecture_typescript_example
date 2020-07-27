import RepositoryMapper from './repository.mapper';
import { Customer } from '@entities';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { Address, IAddressProps } from '../../entities/address';

export const sequelizeCustomerMapper: RepositoryMapper<Customer> = {
  toDomain(customerRowDTO: any): Customer {
    const address = Address.build(customerRowDTO.address).value;

    const customerProps = {
      document: customerRowDTO.document,
      name: customerRowDTO.name,
      cellphone: customerRowDTO.cellphone,
      email: customerRowDTO.email,
      birthdate: customerRowDTO.birthdate,
      address: address
    }

    const uniqueId = new UniqueEntityID(customerRowDTO.id);
    return Customer.build(customerProps, uniqueId).value;
  },

  toPersistence(customer: Customer): any {
    return {
      id: customer.id.toValue(),
      document: customer.document,
      name: customer.name,
      cellphone: customer.cellphone,
      email: customer.email,
      birthdate: customer.birthdate,
      address: customer.address.toValue()
    }
  }
}