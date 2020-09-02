import { Customer, UniqueEntityID, Product, Order } from '@entities';

export interface GenerateOrderGateway {
  startTransaction(): void;
  endTransaction(): Promise<void>;
  save(order: Order): Promise<void>;
  findCustomerById(id: UniqueEntityID): Promise<Customer>;
  findProductById(id: UniqueEntityID): Promise<Product>;
};
