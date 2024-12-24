import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Product from './Product.js';
import User from './User.js';

// Relacionamentos
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export default function associateModels() {
  // Chame esta função no arquivo principal
}
