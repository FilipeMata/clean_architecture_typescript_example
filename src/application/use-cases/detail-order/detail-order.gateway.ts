import { Customer, Order, Product, UniqueEntityID } from "@entities";

export default interface DetailOrderGateway {
  getOrderById(orderId: UniqueEntityID): Promise<Order>;
  getProductById(productId: UniqueEntityID): Promise<Product>;
  getCustomerById(customerId: UniqueEntityID): Promise<Customer>;
};