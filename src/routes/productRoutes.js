import express from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// Rota para criar um produto (Apenas admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Nome, preço e categoria são obrigatórios.' });
    }

    const product = await Product.create({ name, price, category, description });
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto.' });
  }
});

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Rota para buscar produtos por categoria
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.findAll({ where: { category } });

    if (products.length === 0) {
      return res.status(404).json({ error: 'Nenhum produto encontrado para essa categoria.' });
    }

    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos por categoria.' });
  }
});

// Rota para buscar um produto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
});

// Rota para atualizar um produto (Apenas admin)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    await product.update({ name, price, category, description });
    res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
});

// Rota para excluir um produto (Apenas admin)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    await product.destroy();
    res.json({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro ao excluir produto.' });
  }
});

export default router;
