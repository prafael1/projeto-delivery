import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Auth Header recebido:', authHeader); // Log do cabeçalho de autorização

  if (!authHeader) {
    console.log('Erro: Token não fornecido.');
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, 'secreta'); // Substitua 'secreta' pela sua chave secreta
    req.user = decoded; // Adiciona os dados do usuário ao objeto `req`
    console.log('Token decodificado:', decoded); // Log do token decodificado
    return next();
  } catch (error) {
    console.log('Erro ao verificar token:', error.message); // Log de erro
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

export default authMiddleware;
