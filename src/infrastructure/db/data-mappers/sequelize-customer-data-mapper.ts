import { CustomerDataMapper } from "@adapters/common/interfaces/data-mappers";
import { CustomerModel } from '../models/store/customer';
import SequelizeDataMapper from "../sequelize-data-mapper";

export default class SequelizeCustomerDataMapper extends SequelizeDataMapper<CustomerModel> implements CustomerDataMapper {}