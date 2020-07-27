export default interface Repository<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<void>;
  save(t: T): Promise<void>;
  saveCollection(t: Array<T>): Promise<void>
}