import { Product } from '@entities/Product';
import { Invoice } from '@entities/Invoice';

export interface IInvoiceRepository extends Repository<Invoice> {
  getInvoiceById(lineItemId: string): Promise<Invoice>;
}