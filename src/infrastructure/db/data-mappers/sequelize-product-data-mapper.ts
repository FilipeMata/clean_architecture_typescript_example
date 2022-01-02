import { ProductDataMapper } from "@adapters/common/interfaces/data-mappers";
import { ProductModel } from '../models/store/product';
import SequelizeDataMapper from "../sequelize-data-mapper";

export default class SequelizeProductDataMapper extends SequelizeDataMapper<ProductModel> implements ProductDataMapper {}