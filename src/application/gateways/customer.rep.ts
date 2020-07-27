import { Customer } from '@entities';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
import Repository from '@shared/repository';

export interface CustomerRepository extends Repository<Customer> {
  getCustomerById(customerId: UniqueEntityID): Promise<Customer>;
  getCustomerByDocument(document: string): Promise<Customer>;
}