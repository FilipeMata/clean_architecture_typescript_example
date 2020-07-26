import { Entity } from '@shared/domain/entity';
import RepositoryMapper from '@adapters/mappers/repository.mapper';
import { db, Models } from '@infrastructure/db/models';

export interface SequelizeRepositoryProps<E> {
  dbName: string;
  modelName: string;
  mapper: RepositoryMapper<E>;
}

export abstract class SequelizeBaseRepository<E extends Entity<any>> implements Repository<E> {
  protected _db: any;
  protected _mapper: RepositoryMapper<E>;
  private _transaction: any;
  
  constructor(props: SequelizeRepositoryProps<E>) {
    const models = db;
    const dbName = props.dbName;
    const modelName = props.modelName;

    this._db = models[dbName][modelName];
    this._mapper = props.mapper;
  }

  protected setTransaction(transaction: any) {
    if(this._transaction) {
      throw new Error('There is an open transaction for this repository');
    }

    this._transaction = transaction;
  }

  protected async _create(entity: E): Promise<any> {
    return await this._db.create(
      this._mapper.toPersistence(entity), {
      transaction: this._transaction
    });
  }

  protected async _update(entity: E): Promise<void> {
    const options = {
      where: {
        id: entity.id.toValue()
      },
      transaction: this._transaction
    };

    const data = this._mapper.toPersistence(entity);
    return this._db.update(data, options);
  }

  protected async _getBy(conditions: any): Promise<E>{
    const row = await this._db.find({
      where: conditions,
      raw: true
    });

    return this._mapper.toDomain(row);
  };

  async exists(entity: E): Promise<boolean> {
   const count = await this._db.count({
      where: {
        id: entity.id
      }
    });

    return count > 0;
  }

  async save(entity: E): Promise<void> {
    if(this.exists(entity)) {
      await this._update(entity);
    } else {
      await this._create(entity);
    }
  }

  async saveCollention(entities: Array<E>): Promise<void> {
    for (const entity of entities) {
      await this.save(entity);
    }
  }

  async delete(entity: E): Promise<void> {
    return await this._db.destroy({
      where: {
        id: entity.id.toValue()
      }
    });
  }
}
