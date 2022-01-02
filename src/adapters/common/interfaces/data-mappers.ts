import CustomerPersistenceData from '../models/customer-persistence-data';
import LineItemPersistenceData from '../models/line-item-persistence-data';
import OrderPersistenceData from '../models/order-persistence-data';
import ProductPersistenceData from '../models/product-persistence-data';

export interface AbstractDataMapper<Model> {
  findById(id: number | string): Promise<Model>;
  insert(model: Model): Promise<void>;
  bulckInsert(models: Model[]): Promise<void>;
  updateById(id: number | string, data: Partial<Model>): Promise<void>;
};

export interface ProductDataMapper extends AbstractDataMapper<ProductPersistenceData> {}
export interface CustomerDataMapper extends AbstractDataMapper<CustomerPersistenceData> {}

export interface OrderDataMapper extends AbstractDataMapper<OrderPersistenceData> {
  findByIdAndIncludeLineItems(id: string): Promise<OrderPersistenceData>;
}
export interface LineItemDataMapper extends AbstractDataMapper<LineItemPersistenceData> {
  updateByIdAndOrderId(id: number, orderId: string, data: Partial<LineItemPersistenceData>): Promise<void>;
  deleteByOrderIdWhereIdNotInArray(orderId: string, array: number[]): Promise<void>;
}