import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!deliveryInfo.name || !deliveryInfo.address || !deliveryInfo.phone) {
      alert('Por favor, preencha todas as informações de entrega.');
      return;
    }

    if (cartItems.length === 0) {
      alert('O carrinho está vazio. Adicione itens antes de finalizar o pedido.');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: 1, // Ajuste conforme necessário
        })),
        customerName: deliveryInfo.name,
        customerAddress: deliveryInfo.address,
        customerPhone: deliveryInfo.phone,
      };

      const response = await api.post('/orders', orderData);

      if (response.status === 201) {
        clearCart();
        alert('Pedido realizado com sucesso!');
        navigate('/'); // Redirecionar para a página inicial
      } else {
        alert('Erro ao finalizar pedido. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert(
        error.response?.data?.error || 'Erro inesperado ao finalizar pedido. Tente novamente.'
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Finalizar Pedido</h1>

      {/* Itens do Carrinho */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Itens do Carrinho</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">O carrinho está vazio.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <span className="text-gray-700">{item.name}</span>
              <span className="text-gray-700">R$ {item.price.toFixed(2)}</span>
            </div>
          ))
        )}
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>
            R$ {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Informações de Entrega */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Informações de Entrega</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600">Nome:</label>
            <input
              type="text"
              name="name"
              value={deliveryInfo.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Endereço:</label>
            <input
              type="text"
              name="address"
              value={deliveryInfo.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Telefone:</label>
            <input
              type="text"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </form>
        <button
          onClick={handlePlaceOrder}
          className="mt-5 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}

export default Checkout;
