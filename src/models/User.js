import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo nome não pode estar vazio.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'O campo e-mail deve ser um e-mail válido.',
        },
        notEmpty: {
          msg: 'O campo e-mail não pode estar vazio.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo senha não pode estar vazio.',
        },
        len: {
          args: [6, 100], // Garante que a senha tenha no mínimo 6 caracteres
          msg: 'A senha deve ter pelo menos 6 caracteres.',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'client', 'cashier', 'kitchen', 'waiter'),
      defaultValue: 'client',
      allowNull: false,
    },
  },
  {
    hooks: {
      // Antes de criar um novo usuário, a senha será criptografada
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      // Antes de atualizar um usuário, criptografa a senha se ela for alterada
      beforeUpdate: async (user) => {
        if (user.password && user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
    timestamps: true, // Adiciona as colunas createdAt e updatedAt automaticamente
  }
);

export default User;
