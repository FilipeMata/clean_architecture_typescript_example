import BaseRepository from '../common/repositories/base-repository';
import MixOrderRepository from '../common/repositories/order.rep';
import MixProductRepository from '../common/repositories/product.rep';
import MixCustomerRepository from '../common/repositories/customer.rep';

const GetOrderDataGateway = MixOrderRepository(MixProductRepository(MixCustomerRepository(BaseRepository)));
export default GetOrderDataGateway;
