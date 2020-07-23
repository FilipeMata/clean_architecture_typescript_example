import { LineItem } from '@entities/line-item';

export default  interface LineItemRepository extends Repository<LineItem> {
  getLineItemById(lineItemId: string): Promise<LineItem>;
}