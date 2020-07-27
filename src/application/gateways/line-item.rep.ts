import { LineItem } from '@entities';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import Repository from '@shared/repository';

export interface LineItemRepository extends Repository<LineItem> {
  getLineItemById(lineItemId: UniqueEntityID): Promise<LineItem>;
  getLineItemsByInvoiceId(invoiceId: UniqueEntityID): Promise<Array<LineItem>>;
}