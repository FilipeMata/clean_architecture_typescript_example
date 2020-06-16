import { SQLBaseRepository, SQLRepositoryProps } from './sql-base.rep';
import sqlInvoiceMapper from '../mappers/sql-invoice.mapper';
import SQLLineItemRepository from './sql-line-item.rep';
import { Invoice, UniqueEntityID } from '@entities';
import { Connections } from './sql-models';

export default class SQLInvoiceRepository extends SQLBaseRepository<Invoice> {
  private _lineItemRepository: SQLLineItemRepository;

  constructor( db: Connections ) {
    const props: SQLRepositoryProps<Invoice> = {
      dbName: 'store',
      modelName: 'invoice',
      mapper: sqlInvoiceMapper
    };

    super(props, db);
    this._lineItemRepository = new SQLLineItemRepository(db);
  }

  /**
   * @override
   */
  async save(invoice: Invoice): Promise<void> {
    await this._lineItemRepository.saveCollection(invoice.lineItems);
    await super.save(invoice);
  }

  async getInvoiceById(invoiceId: UniqueEntityID): Promise<Invoice> {
    const invoice = await this._getBy({
      id: invoiceId.toValue()
    });

    if (!invoice) {
      return null;
    }

    const lineItems = await this._lineItemRepository
      .getLineItemsByInvoiceId(invoice.id);

    invoice.lineItems = lineItems;

    return invoice;
  }
}
