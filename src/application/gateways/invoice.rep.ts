import { Invoice } from '@entities';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import Repository from '@shared/repository';

export interface InvoiceRepository extends Repository<Invoice> {
  getInvoiceById(invoiceId: UniqueEntityID): Promise<Invoice>;
}