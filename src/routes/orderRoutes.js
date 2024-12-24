import express from 'express';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rota de teste
router.get('/test', (req, res) => {
  res.send('Rota de pedidos funcionando!');
});

// Criar pedido (rota pública, sem autenticação)
router.post('/', async (req, res) => {
  try {
    console.log('Requisição recebida para criar pedido:', req.body);

    const { items, customerName, customerAddress, customerPhone } = req.body;

    if (!items || items.length === 0) {
      console.error('Nenhum item foi fornecido no pedido.');
      return res.status(400).json({ error: 'É necessário incluir ao menos um item no pedido.' });
    }

    // Calcular total do pedido
    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        console.error(`Produto com ID ${item.productId} não encontrado.`);
        return res.status(404).json({ error: `Produto com ID ${item.productId} não encontrado.` });
      }
      total += product.price * item.quantity;
    }

    // Criar o pedido
    const order = await Order.create({
      total,
      customerName,
      customerAddress,
      customerPhone,
    });

    // Criar os itens do pedido
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    console.log('Pedido criado com sucesso:', order);
    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
});

// Listar pedidos (rota protegida)
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Usuário autenticado:', req.user);

    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [Product],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    console.log('Pedidos carregados:', orders);
    res.json(orders);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro ao listar pedidos.' });
  }
});

// Buscar pedido por ID (rota protegida)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Buscando pedido por ID:', id);

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [Product],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!order) {
      console.error('Pedido não encontrado com o ID:', id);
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    console.log('Pedido encontrado:', order);
    res.json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ error: 'Erro ao buscar pedido.' });
  }
});

// Atualizar status do pedido (rota protegida)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Atualizando status do pedido:', { id, status });

    const order = await Order.findByPk(id);
    if (!order) {
      console.error('Pedido não encontrado com o ID:', id);
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    order.status = status;
    await order.save();

    console.log('Pedido atualizado com sucesso:', order);
    res.json(order);
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do pedido.' });
  }
});

// Excluir pedido (rota protegida)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Tentativa de exclusão do pedido com ID:', id);

    const order = await Order.findByPk(id);
    if (!order) {
      console.error('Pedido não encontrado com o ID:', id);
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    await order.destroy();
    console.log('Pedido excluído com sucesso:', id);

    res.json({ message: 'Pedido excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir pedido:', error);
    res.status(500).json({ error: 'Erro ao excluir pedido.' });
  }
});

export default router;
