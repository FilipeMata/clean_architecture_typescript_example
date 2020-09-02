'use strict';

class Relations {

    constructor(db) {
        this.db = db;
    }

    load() { 
        this.db.store.line_item.belongsTo(
            this.db.store.order, { foreignKey: 'order_id' }
        );

        this.db.store.order.hasMany(
            this.db.store.line_item, { foreignKey: 'order_id' }
        );

        this.db.store.order.belongsTo(
            this.db.store.customer, { foreignKey: 'customer_id' }
        );

        this.db.store.line_item.hasOne(
            this.db.store.product, { sourceKey: 'product_id', foreignKey: 'id' }
        )
    }
}

module.exports = Relations;