import { FindOptions, WhereOptions, Op, CreateOptions, DestroyOptions, UpdateOptions, IncludeOptions } from 'sequelize/types';
import { ModelCtor, Model as SequelizeModel} from 'sequelize';
import { getModels } from './models';
import { SequelizeUnitOfWork } from './sequelize-unit-of-work';
import { AbstractDataMapper } from '@adapters/common/interfaces/data-mappers';

export default abstract class SequelizeDataMapper<Model extends SequelizeModel> implements AbstractDataMapper<Model>{

    protected _uow: SequelizeUnitOfWork;
    protected _model: ModelCtor<any>;
    constructor(container: any) {
      this._uow = container.unitOfWork;

      const camelToUnderscore = (key: string) => {
        var result = key.replace( /([A-Z])/g, " $1" ).slice(1);
        return result.split(' ').join('_').toLowerCase();
      }

      const re = /Sequelize(\w+)DataMapper/;
      const modelName = camelToUnderscore(this.constructor.name.replace(re, '$1'));
      
      this._model = ((getModels().models) as any)[modelName] as ModelCtor<any>;
    }

    public async findById(id: number | string): Promise<Model> {
      return this.find({ id }) as any as Model;
    }

    public async insert(model: Model): Promise<void> {
      const transaction = await this._uow.transaction;
      const options: CreateOptions = {};

      if (transaction) {
        options.transaction = transaction;
      }
  
      await this._model.create(model, options);
    }

    public async bulckInsert(models: Model[]): Promise<void> {
      const transaction = await this._uow.transaction;
      const options: CreateOptions = {};

      if (transaction) {
        options.transaction = transaction;
      }
  
      await this._model.bulkCreate(models, options);
    }

    public async updateById(id: number | string, data: Partial<Model>) {
      await this.update({id}, data as any as UpdateOptions);
    }

    private async _generateFindOptions(conditions: WhereOptions, include?: IncludeOptions[]): Promise<FindOptions> {
      const transaction = await this._uow.transaction;
      const options: FindOptions = {
        where: conditions,
        include,
        raw: true
      };

      if(include) {
        options.nest = true;
      }

      if (transaction) {
        options.transaction = transaction;
        options.lock = transaction.LOCK.UPDATE
      }

      return options;
    }

    protected async find(conditions: WhereOptions, include?: IncludeOptions[]): Promise<SequelizeModel<Model>> {
      const options = await this._generateFindOptions(conditions, include);
      return this._model.findOne(options);
    }

    protected async findAll(conditions: WhereOptions, include?: IncludeOptions[]): Promise<SequelizeModel<Model>[]> {
      const options = await this._generateFindOptions(conditions, include);
      return this._model.findAll(options);
    }

    protected async delete(conditions: WhereOptions): Promise<void> {
      const transaction = await this._uow.transaction;
      const options: DestroyOptions = {
        where: conditions
      };

      if (transaction) {
        options.transaction = transaction;
      }
  
      await this._model.destroy(options);
    }

    protected async update(conditions: WhereOptions, data: UpdateOptions): Promise<void> {
      const transaction = await this._uow.transaction;
      const options: UpdateOptions = {
        where: conditions
      };

      if (transaction) {
        options.transaction = transaction;
      }
  
      await this._model.update(data, options);
    }
}