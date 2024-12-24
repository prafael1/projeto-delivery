import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js'; // Middleware para autorização por papel

const router = express.Router();

// Rota para criar um novo usuário (Apenas admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log('Tentativa de criação de usuário:', { name, email, role });

    // Verificar se o e-mail já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('E-mail já cadastrado:', email);
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    // Criar o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Senha hash gerada:', hashedPassword);

    // Criar o novo usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'client', // Define "client" como padrão se o papel não for fornecido
    });
    console.log('Usuário criado com sucesso:', user);

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Rota de Login (Acesso público)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Tentativa de login:', email);

    // Verificar se o e-mail existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuário não encontrado com o e-mail:', email);
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    console.log('Usuário encontrado:', user);
    console.log('Senha enviada pelo cliente:', password);
    console.log('Hash armazenado no banco:', user.password);

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Senha válida:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Senha inválida para o usuário:', email);
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'secreta', // Substitua por uma chave secreta segura
      { expiresIn: '1h' } // Token válido por 1 hora
    );

    console.log('Token JWT gerado:', token);

    res.json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
});

// Outras rotas mantêm as funcionalidades do código antigo para evitar problemas no futuro

// Rota para listar todos os usuários (Apenas admin)
router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    console.log('Listando todos os usuários...');
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Rota para buscar o próprio usuário (Qualquer usuário autenticado)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    console.log('Buscando informações do usuário logado:', req.user.id);
    const user = await User.findByPk(req.user.id);
    if (!user) {
      console.log('Usuário logado não encontrado:', req.user.id);
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário logado:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário logado.' });
  }
});

// Rota para excluir um usuário (Apenas admin)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Tentativa de exclusão do usuário com ID:', id);

    const user = await User.findByPk(id);

    if (!user) {
      console.log('Usuário não encontrado com o ID:', id);
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await user.destroy();
    console.log('Usuário excluído com sucesso:', id);

    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
});

export default router;
