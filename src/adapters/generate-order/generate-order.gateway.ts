import BaseRepository from '../common/repositories/base-repository';
import MixCustomerRepositoy from '../common/repositories/customer.rep';
import MixProductRepository from '../common/repositories/product.rep';

const GenerateOrderGateway = MixCustomerRepositoy(MixProductRepository(BaseRepository));
export default GenerateOrderGateway;
