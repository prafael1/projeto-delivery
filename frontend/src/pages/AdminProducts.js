import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
  });

  const fetchProducts = async () => {
    try {
      const response = await api.get('/admin/products');
      console.log('Produtos carregados:', response.data); // Log para depurar
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro ao carregar produtos. Tente novamente.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      console.log('Produto a ser enviado:', newProduct); // Log para depurar
      await api.post('/admin/products', newProduct);
      alert('Produto adicionado com sucesso!');
      fetchProducts(); // Atualizar a lista após adicionar
      setNewProduct({ name: '', price: '', category: '', description: '', stock: '' });
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto. Tente novamente.');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
      alert('Produto excluído com sucesso!');
      fetchProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-5">Gerenciamento de Produtos</h1>

      {/* Formulário de Adição */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-5">
        <h2 className="text-xl font-semibold mb-3">Adicionar Produto</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={newProduct.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Preço"
            value={newProduct.price}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={newProduct.category}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Estoque"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <textarea
          name="description"
          placeholder="Descrição"
          value={newProduct.description}
          onChange={handleInputChange}
          className="mt-3 p-2 border rounded w-full"
        />
        <button
          onClick={handleAddProduct}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar Produto
        </button>
      </div>

      {/* Lista de Produtos */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Lista de Produtos</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Preço</th>
              <th className="border border-gray-300 p-2">Categoria</th>
              <th className="border border-gray-300 p-2">Estoque</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">R$ {product.price.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{product.category}</td>
                <td className="border border-gray-300 p-2">{product.stock}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
