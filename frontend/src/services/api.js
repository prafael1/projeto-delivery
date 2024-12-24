import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Altere a URL conforme necessário
});

// Intercepta as requisições para adicionar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Pega o token armazenado no localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho de autorização
  }
  return config;
});

export default api;
