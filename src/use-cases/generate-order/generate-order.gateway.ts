import { Customer, UniqueEntityID, Product, Order } from '@entities';

export default interface GenerateOrderGateway {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  saveOrder(order: Order): Promise<void>;
  findCustomerById(id: UniqueEntityID): Promise<Customer>;
  findProductById(id: UniqueEntityID): Promise<Product>;
};