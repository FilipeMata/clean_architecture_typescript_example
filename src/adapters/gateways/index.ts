import BaseRepository from './mixins/base-repository';
import FindableCustomer from './mixins/findable-customer';
import FindableProduct from './mixins/findable-product.rep';
import FindableOrder from './mixins/findable-order';


export const DeatailOrderGateway = FindableOrder(BaseRepository);
export const GenerateOrderGateway = FindableCustomer(FindableProduct(BaseRepository));
