export interface UnitOfWork {
  startTransaction(): Promise<void>
  commit(): Promise<void>;
  rollback(): Promise<void>;
}