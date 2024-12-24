import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Recupera o token do localStorage
        if (!token) {
          setError('Você precisa estar logado para acessar esta página.');
          return;
        }

        const response = await api.get('/orders', {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });

        console.log('Pedidos carregados com sucesso:', response.data);
        setOrders(response.data);
      } catch (err) {
        console.error('Erro ao carregar pedidos:', err);
        setError('Erro ao carregar pedidos. Verifique suas credenciais.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Pedidos</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded">
            <h2 className="font-semibold">Pedido #{order.id}</h2>
            <p>Total: R$ {order.total}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrders;
