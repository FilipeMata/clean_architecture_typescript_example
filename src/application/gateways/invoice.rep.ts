import { Invoice } from '@entities';

export interface InvoiceRepository extends Repository<Invoice> {
  getInvoiceById(lineItemId: string): Promise<Invoice>;
}