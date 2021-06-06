import { DB } from './models';

export default (db: DB): void => {
  db.models.line_item.belongsTo(
    db.models.order, { foreignKey: 'order_id' }
  );

  db.models.order.hasMany(
    db.models.line_item, { foreignKey: 'order_id' }
  );

  db.models.order.belongsTo(
    db.models.customer, { foreignKey: 'customer_id' }
  );

  db.models.line_item.hasOne(
    db.models.product, { sourceKey: 'product_id', foreignKey: 'id' }
  )
};
