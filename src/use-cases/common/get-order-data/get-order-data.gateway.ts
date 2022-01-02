import { UniqueEntityID, Order, Customer, Product } from '@entities';

export default interface GetOrderDataGateway {
  findOrderById(orderId: UniqueEntityID): Promise<Order>;
  findCustomerById(customerId: UniqueEntityID): Promise<Customer>;
  findProductById(productID: UniqueEntityID): Promise<Product>;
};