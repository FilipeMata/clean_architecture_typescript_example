import { SequelizeBaseRepository, SequelizeRepositoryProps } from './sequelize-base.rep';
import { sequelizeLineItemMapper } from '../mappers/sequelize-line-item.mapper';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
import { LineItem } from '@entities';
import { LineItemRepository } from '../../application/gateways/line-item.rep';

export default class SequelizeLineItemRepository extends SequelizeBaseRepository<LineItem> implements LineItemRepository {

  constructor() {
    const props: SequelizeRepositoryProps<LineItem> = {
      dbName: 'store',
      modelName: 'line_item',
      mapper: sequelizeLineItemMapper
    };

    super(props);
  }

  async getLineItemById(lineItemId: UniqueEntityID): Promise<LineItem> {
    return this._getBy({
      id: lineItemId.toValue()
    })
  }
}
