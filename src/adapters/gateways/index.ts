import BaseRepository from './repositories/base-repository';
import MixCustomerRepositoy from './repositories/customer.rep';
import MixProductRepository from './repositories/product.rep';
import MixOrderRepository from './repositories/order.rep';

export { Mapper, Mappers } from './mappers';
export { MapperRegistry } from './mapper-registry';

export const DeatailOrderGateway = MixOrderRepository(BaseRepository);
export const GenerateOrderGateway = MixCustomerRepositoy(MixProductRepository(BaseRepository));
