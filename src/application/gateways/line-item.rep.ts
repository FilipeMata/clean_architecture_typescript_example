import { LineItem } from '@entities';

export interface LineItemRepository extends Repository<LineItem> {
  getLineItemById(lineItemId: string): Promise<LineItem>;
}