import Customer from '../../entities/Customer';

export interface ICustomerRepository extends Repository<Customer> {
  getCustomerById(lineItemId: string): Promise<Customer>;
  getCustomerByDocument(lineItemId: string): Promise<Customer>;
}