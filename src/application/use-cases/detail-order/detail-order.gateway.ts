import { Customer, Order, Product, UniqueEntityID } from "@entities";

export default interface DetailOrderGateway {
  findOrderById(orderId: UniqueEntityID): Promise<Order>;
  findProductById(productId: UniqueEntityID): Promise<Product>;
  findCustomerById(customerId: UniqueEntityID): Promise<Customer>;
};