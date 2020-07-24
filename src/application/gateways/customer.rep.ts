import { Customer } from '@entities';

export interface CustomerRepository extends Repository<Customer> {
  getCustomerById(lineItemId: string): Promise<Customer>;
  getCustomerByDocument(lineItemId: string): Promise<Customer>;
}