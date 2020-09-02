import { Mapper, Mappers } from "../../adapters/gateways/mappers";
import SqlOrderMapper from '../mappers/sql-order.mapper';
import SqlProductMapper from '../mappers/sql-product.mapper';
import SqlCustomerMapper from '../mappers/sql-customer.mapper';

const db = require('../db/models');

const mappers: Mappers = {
  'Order': new SqlOrderMapper(db),
  'Product': new SqlProductMapper(db),
  'Customer': new SqlCustomerMapper(db)
}

export default mappers;