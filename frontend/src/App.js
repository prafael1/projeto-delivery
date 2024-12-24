import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './contexts/CartContext'; // Contexto do carrinho
import Navbar from './components/Navbar'; // Navbar para navegação
import Products from './pages/Products'; // Página de produtos
import Cart from './pages/Cart'; // Página do carrinho
import Checkout from './pages/Checkout'; // Página de finalização do pedido
import AdminDashboard from './pages/AdminDashboard'; // Página do painel administrativo
import AdminLogin from './pages/AdminLogin'; // Página de login do administrador
import AdminProducts from './pages/AdminProducts'; // Adicione esta linha
import AdminOrders from './pages/AdminOrders'; // Adicione esta linh

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar /> {/* Navbar exibida em todas as páginas */}
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />  
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/" element={<Products />} /> {/* Página inicial - Produtos */}
            <Route path="/cart" element={<Cart />} /> {/* Página do carrinho */}
            <Route path="/checkout" element={<Checkout />} /> {/* Página de checkout */}
            <Route path="/admin" element={<AdminDashboard />} /> {/* Painel administrativo */}
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
