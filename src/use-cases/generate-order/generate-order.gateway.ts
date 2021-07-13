import { Customer, UniqueEntityID, Product, Order } from '@entities';

export default interface GenerateOrderGateway {
  startTransaction(): Promise<void>;
  endTransaction(): Promise<void>;
  saveOrder(order: Order): Promise<void>;
  findCustomerById(id: UniqueEntityID): Promise<Customer>;
  findProductById(id: UniqueEntityID): Promise<Product>;
};