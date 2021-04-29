import { Transaction, Sequelize } from 'sequelize';
import { DataMapper, TransactionalDataMappers } from '../../adapters/common/mappers';
import SqlOrderMapper from '../mappers/sql-order.mapper';
import SqlProductMapper from '../mappers/sql-product.mapper';
import SqlCustomerMapper from '../mappers/sql-customer.mapper';
import SqlLineItemMapper from '../mappers/sql-line-item.mapper';

interface EntityDataMappers {
  [entity: string]: DataMapper
}
export class SequelizeDataMappers implements TransactionalDataMappers {
  private _transaction: Transaction;
  private _mappers: EntityDataMappers;
  private _db: any;

  constructor(connections: any) {
    this._db = connections;
    this._transaction = null;
    this._mappers = {};
  }

  private _buildEntityMapper(entity: string) {
    switch (entity) {
      case 'Order':
        return new SqlOrderMapper(this._db, this._transaction);
      case 'LineItem':
        return new SqlLineItemMapper(this._db, this._transaction);
      case 'Product':
        return new SqlProductMapper(this._db, this._transaction);
      case 'Customer':
        return new SqlCustomerMapper(this._db, this._transaction);
      default:
        throw new Error(`There is no initialized Mapper for ${entity} entity`);
    }
  }

  public async startTransaction() {
    this._transaction = await this._db.store.sequelize.transaction();
  }

  public getEntityMapper(entityName: string): DataMapper {
    if (!this._mappers[entityName]) {
      this._mappers[entityName] = this._buildEntityMapper(entityName);
    }

    return this._mappers[entityName];
  }

  public async commitTransaction() {
    await this._transaction.commit();
    this._transaction = undefined;
  }

  public async rollbackTransaction() {
    if (!this._transaction) {
      return;
    } 

    await this._transaction.rollback();
    this._transaction = undefined;
  }
}