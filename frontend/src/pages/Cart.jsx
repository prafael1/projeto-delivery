import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // Verificar se o carrinho está vazio
  if (!cartItems || cartItems.length === 0) {
    return <div className="p-5 text-center text-gray-600">O carrinho está vazio!</div>;
  }

  // Calcular o total do carrinho
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Carrinho</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="bg-white rounded-lg shadow-md p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-gray-500">R$ {item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Quantidade: {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">
          Total: R$ {total.toFixed(2)}
        </h2>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
        >
          Limpar Carrinho
        </button>
      </div>
    </div>
  );
}

export default Cart;
