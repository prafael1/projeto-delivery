import bcrypt from 'bcryptjs';

// Hash armazenado no banco
const storedHash = '$2a$10$m2OJqGXxPzcn39Cgg073kOfOYmSHk3uJCqZ2UduTMpamHl/Wb0yKu';
// Senha fornecida pelo usuário
const providedPassword = '7226490Prr*';

bcrypt.compare(providedPassword, storedHash)
  .then((result) => {
    console.log('Senha válida:', result); // Deve retornar true se o hash e a senha corresponderem
  })
  .catch((err) => {
    console.error('Erro ao comparar senha:', err);
  });
