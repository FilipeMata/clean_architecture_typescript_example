import { LineItemDataMapper } from '@adapters/common/interfaces/data-mappers';
import LineItemPersistenceData from '@adapters/common/models/line-item-persistence-data';
import { UpdateOptions } from 'sequelize/types';
import { Op } from 'sequelize';
import { LineItemModel } from '../models/store/line-item';
import SequelizeDataMapper from "../sequelize-data-mapper";

export default class SequelizeLineItemDataMapper extends SequelizeDataMapper<LineItemModel> implements LineItemDataMapper {
    public async updateByIdAndOrderId(id: number, orderId: string, data: Partial<LineItemPersistenceData>): Promise<void> {
        return this.update({ 
            where: {
                id,
                order_id: orderId
            } 
          }, data as any as UpdateOptions);
    }

    public async deleteByOrderIdWhereIdNotInArray(orderId: string, array: number[]): Promise<void> {
        return this.delete({
            order_id: orderId,
            id: {
                [Op.notIn]: array
            }
        });
    }
}