import { SequelizeBaseRepository, SequelizeRepositoryProps } from './sequelize-base.rep';
import { sequelizeInvoiceMapper } from '../mappers/sequelize-invoice.mapper';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
import { InvoiceRepository } from '../../application/gateways/invoice.rep';
import { Invoice } from '@entities';
import { LineItemRepository } from '@aplication/gateways';

export default class SequelizeInvoiceRepository extends SequelizeBaseRepository<Invoice> implements InvoiceRepository {
  private _lineItemRepository: LineItemRepository;

  constructor(
    lineItemRepository: LineItemRepository
  ) {
    const props: SequelizeRepositoryProps<Invoice> = {
      dbName: 'store',
      modelName: 'invoice',
      mapper: sequelizeInvoiceMapper
    };

    super(props);
    this._lineItemRepository = lineItemRepository;
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

    const lineItems = await this._lineItemRepository
      .getLineItemsByInvoiceId(invoice.id);

    invoice.lineItems = lineItems;

    return invoice;
  }
}
