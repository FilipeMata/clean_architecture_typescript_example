export default interface RepositoryMapper<E> {
  toPersistence(entity: E): any;
  toDomain(dto: any): E
}