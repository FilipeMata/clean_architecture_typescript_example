import { LineItem } from '@entities/LineItem';

export interface ILineItemRepository extends Repository<LineItem> {
  getLineItemById(lineItemId: string): Promise<LineItem>;
}