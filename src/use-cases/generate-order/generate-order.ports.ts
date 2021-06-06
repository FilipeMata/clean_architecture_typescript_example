import { Customer, UniqueEntityID, Product, Order } from '@entities';
import { GenerateOrderResponseDTO } from './generate-order.dtos';

export interface GenerateOrderGateway {
  startTransaction(): void;
  endTransaction(): Promise<void>;
  save(order: Order): Promise<void>;
  findCustomerById(id: UniqueEntityID): Promise<Customer>;
  findProductById(id: UniqueEntityID): Promise<Product>;
};

export interface GenerateOrderPresenter {
  show(result: GenerateOrderResponseDTO): void | Promise<void>;
}
