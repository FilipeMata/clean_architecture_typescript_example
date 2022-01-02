import { Product, UniqueEntityID } from "@entities";
  
export default interface ProductPersistenceData {
  id: number;
  name: string;
  description: string;
  price: number;
}

export function toDomain(product: ProductPersistenceData): Product {
  if (!product) {
    return null;
  }
  
  return Product.build({
    id: new UniqueEntityID(product.id),
    description: product.description,
    name: product.name,
    price: product.price
  });
}

export function toPersistence(product: Product): Partial<ProductPersistenceData> {
  const persistenceData: Partial<ProductPersistenceData> = {};

  if (product.isNew || product.getDirtyProps().includes('id')) {
    persistenceData.id = +product.id.toValue();
  }

  if (product.isNew || product.getDirtyProps().includes('description')) {
    persistenceData.description = product.description;
  }

  if (product.isNew || product.getDirtyProps().includes('name')) {
    persistenceData.name = product.name;
  }
  
  if (product.isNew || product.getDirtyProps().includes('price')) {
    persistenceData.price = product.price;
  }
  
  return persistenceData;
}

