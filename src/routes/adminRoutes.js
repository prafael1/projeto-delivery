// src/routes/adminRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: admin.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Rotas protegidas aqui
router.use(authMiddleware);

// Outras rotas para gerenciar produtos e pedidos

export default router;
