/**
 * Middleware para controle de acesso baseado em papéis
 * @param {Array} allowedRoles - Lista de papéis autorizados
 * @returns {Function} Middleware de autorização
 */
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // Obtém o papel do usuário decodificado no token
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Acesso negado. Permissões insuficientes.' });
    }

    // Prossegue para a próxima função se autorizado
    next();
  };
};

export default roleMiddleware;
