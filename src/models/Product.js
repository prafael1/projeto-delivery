import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome do produto não pode estar vazio.',
      },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: 'O preço deve ser um número válido.',
      },
      min: {
        args: [0],
        msg: 'O preço deve ser maior ou igual a 0.',
      },
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'products', // Força o uso do nome correto da tabela
  timestamps: true, // Habilita createdAt e updatedAt automaticamente
});

export default Product;
