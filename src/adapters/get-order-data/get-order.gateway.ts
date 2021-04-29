import BaseRepository from '../common/repositories/base-repository';
import MixOrderRepository from '../common/repositories/order.rep';

const GetOrderDataGateway = MixOrderRepository(BaseRepository);
export default GetOrderDataGateway;
