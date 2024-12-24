import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext'; // Certifique-se de importar corretamente o contexto
import api from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Use o contexto para acessar `addToCart`

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Produtos Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
            <p className="text-gray-500 mt-2">R$ {product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)} // Certifique-se de que `addToCart` está sendo chamado corretamente
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
