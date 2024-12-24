import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: console.log, // Ativar logs
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

export default sequelize;
