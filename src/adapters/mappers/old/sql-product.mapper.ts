import RepositoryMapper from './old/repository.mapper';
import { Product, UniqueEntityID } from '@entities';

const sqlProductMapper: RepositoryMapper<Product> = {
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

export default sqlProductMapper;