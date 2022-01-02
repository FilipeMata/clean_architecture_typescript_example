import { Criteria } from "./criteria";

type MaintainKey<T, U> = 
  { [K in keyof T]: T[K] extends U ? K : never }[keyof T]

type SearchSort<Type> = keyof Partial<Pick<Type, MaintainKey<Type, string> | MaintainKey<Type, number> | MaintainKey<Type, Date>>>;
type SearchOrder = 'asc' | 'desc';

export type Include<Model> = {
  model: string
  criteria?: Criteria<Model>
  includes?: Include<any>[]
}

export interface SearchOptions<Type> {
  criteria: Criteria<Type>;
  includes?: Include<any>[]
  orderBy?: SearchOrder;
  sortBy?: SearchSort<Type>
}