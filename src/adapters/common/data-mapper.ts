import { Criteria } from './criteria';
import { SearchOptions } from './search-options';

export interface DataMapper<Model> {
  find(options: SearchOptions<Model>): Promise<Model>
  findAll(options: SearchOptions<Model>): Promise<Model[]>
  insert(model: Model): Promise<void>;
  bulckInsert(models: Model[]): Promise<void>;
  update(criteria: Criteria<Model>, data: Partial<Model>): Promise<void>;
  delete(criteria: Criteria<Model>): Promise<void>;
};