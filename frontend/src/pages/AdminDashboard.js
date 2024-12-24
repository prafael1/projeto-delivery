import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Dashboard Administrativo</h1>
      <div className="space-y-4">
        <Link
          to="/admin/products"
          className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Gerenciar Produtos
        </Link>
        <Link
          to="/admin/orders"
          className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Acompanhar Pedidos
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
