import { Product } from '@entities/product';
import { Invoice } from '@entities/invoice';

export default interface InvoiceRepository extends Repository<Invoice> {
  getInvoiceById(lineItemId: string): Promise<Invoice>;
}