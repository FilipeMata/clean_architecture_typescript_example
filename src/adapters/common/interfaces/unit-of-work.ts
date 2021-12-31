export interface UnitOfWork {
  startTransaction(): Promise<void>
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}