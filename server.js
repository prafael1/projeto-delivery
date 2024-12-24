import express from 'express';
import cors from 'cors'; // Importação do cors no formato ES6
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import sequelize from './src/config/database.js';
import associateModels from './src/models/associations.js';

const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

// Registro das rotas
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Configuração de associações entre modelos
associateModels();

// Sincronização do banco de dados
sequelize
  .sync({ alter: true }) // Alinha o esquema das tabelas com os modelos (sem perder dados)
  .then(() => console.log('Banco de dados sincronizado!'))
  .catch((err) => console.error('Erro ao sincronizar banco:', err));

// Rota inicial
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Middleware para capturar erros de JSON malformado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Erro de JSON malformado:', err.message);
    return res.status(400).send({ error: 'JSON inválido' });
  }
  next();
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
