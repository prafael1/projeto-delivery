import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="bg-blue-500 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Projeto Delivery
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Produtos
          </Link>
          <Link to="/cart" className="hover:text-gray-200">
            Carrinho ({cartItems.length})
          </Link>
          <Link to="/checkout" className="hover:text-gray-200">
            Finalizar Pedido
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
