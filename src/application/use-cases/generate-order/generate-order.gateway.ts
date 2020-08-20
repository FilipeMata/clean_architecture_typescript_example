import { Customer, UniqueEntityID } from '@entities';

export default interface GenerateOrderGateway {
  getCustomerById(id: UniqueEntityID): Promise<Customer>;
  generateNewOrderId(): UniqueEntityID;
};
