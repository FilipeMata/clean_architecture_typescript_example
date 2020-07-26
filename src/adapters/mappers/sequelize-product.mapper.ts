import RepositoryMapper from './repository.mapper';
import { Product } from '@entities';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

export const sequelizeProductMapper: RepositoryMapper<Product> = {
  toDomain(productRowDTO: any): Product {
    const productProps = {
      name: productRowDTO.name,
      description: productRowDTO.description,
      price: productRowDTO.price
    }

    const uniqueId = new UniqueEntityID(productRowDTO.id);
    return Product.build(productProps, uniqueId).value;
  },

  toPersistence(product: Product): any {
    return {
      id: product.id.toValue(),
      name: product.name,
      description: product.description,
      price: product.price
    } 
  }
}