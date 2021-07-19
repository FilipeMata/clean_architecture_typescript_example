import MixCustomerRepositoy from '../common/repositories/customer.rep';
import MixProductRepository from '../common/repositories/product.rep';

const GenerateOrderGateway = MixCustomerRepositoy(MixProductRepository(class {}));
export default GenerateOrderGateway;
