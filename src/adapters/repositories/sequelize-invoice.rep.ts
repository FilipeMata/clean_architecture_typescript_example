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
      modelName: 'line_item',
      mapper: sequelizeInvoiceMapper
    };

    super(props);
    this._lineItemRepository = lineItemRepository;
  }

  /**
   * @override
   */
  async save(invoice: Invoice): Promise<void> {
    await this._lineItemRepository.saveCollention(invoice.lineItems);
    await super.save(invoice);
  }

  async getInvoiceById(invoiceId: UniqueEntityID): Promise<Invoice> {
    return this._getBy({
      id: invoiceId.toValue()
    })
  }
}
