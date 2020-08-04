import DetailOrderGateway from '../../application/use-cases/detail-order/detail-order.gateway';
import { UniqueEntityID } from '@entities';
import { Customer, Order, Product} from '@entities';


interface CustomerRepositoryForDetailOrder {
  getCustomerById(customerId: UniqueEntityID): Promise<Customer>
};

interface ProductRepositoryForDetailOrder {
  getProductById(productId: UniqueEntityID): Promise<Product>
};


interface OrderRepositoryForDetailOrder {
  getOrderById(customerId: UniqueEntityID): Promise<Order>
};


export default class DetailOrderGatewayImpl implements DetailOrderGateway {
  private _customerRep: CustomerRepositoryForDetailOrder;
  private _productRep: ProductRepositoryForDetailOrder;
  private _orderRep: OrderRepositoryForDetailOrder;

  constructor(
    customerRep: CustomerRepositoryForDetailOrder,
    productRep: ProductRepositoryForDetailOrder,
    orderRep: OrderRepositoryForDetailOrder
  ) {
    this._customerRep = customerRep;
    this._productRep = productRep;
    this._orderRep = orderRep;
  }
  
  async getCustomerById(customerId: UniqueEntityID): Promise<Customer> {
    return this._customerRep.getCustomerById(customerId);
  };

  getProductById(productId: UniqueEntityID): Promise<Product> {
    return this._productRep.getProductById(productId);
  }

  getOrderById(orderId: UniqueEntityID): Promise<Order> {
    return this._orderRep.getOrderById(orderId);
  }
}