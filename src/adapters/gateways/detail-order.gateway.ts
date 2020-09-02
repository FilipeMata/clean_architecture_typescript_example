import DetailOrderGateway from '../../application/use-cases/detail-order/detail-order.gateway';
import { Gateway, BaseGateway } from './base-gateway';
import CustomerDecorator from './decorators/customer-decorator';
import ProductDecorator from './decorators/product-decorator.rep';
import OrderDecorator from './decorators/oder-decorator';


let baseGateway: DetailOrderGateway;
const g1 = new BaseGateway();
const g2 = new CustomerDecorator(g1);
const g3 = new ProductDecorator(g2);
baseGateway = new OrderDecorator(g3);

detailOrderGateway.fin

