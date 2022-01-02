import { OrderDataMapper } from "@adapters/common/interfaces/data-mappers";
import OrderPersistenceData from "@adapters/common/models/order-persistence-data";
import { LineItemModel } from "../models/store/line-item";
import { OrderModel } from '../models/store/order';
import SequelizeDataMapper from "../sequelize-data-mapper";

export default class SequelizeOrderDataMapper extends SequelizeDataMapper<OrderModel> implements OrderDataMapper {
    public async findByIdAndIncludeLineItems(id: string): Promise<OrderPersistenceData> {
        const model = await this.find({ id }, [{model: LineItemModel}]);
        return model as unknown as OrderPersistenceData;
    }
}