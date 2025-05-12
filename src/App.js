import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import Cart from './features/cart/Cart';
import MainLayout from './layouts/MainLayout';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import Favorites from './features/profile/Favorites';
import ProfileLayout from './pages/ProfileLayout';
import Profile from './features/profile/Profile';
import ProductsTable from './features/profile/ProductsTable';
import CategoriesTable from './features/profile/CategoriesTable';
import UsersTable from './features/profile/UsersTable';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>

                } />
                <Route path="/login" element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } />
                <Route path="/profile" element={<ProfileLayout />}>
                  <Route path="" element={<Profile />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="products" element={
                    <AdminRoute>
                      <ProductsTable />
                    </AdminRoute>
                  } />
                  <Route path="users" element={
                    <AdminRoute>
                      <UsersTable />
                    </AdminRoute>
                  } />
                  <Route path="categories" element={
                    <AdminRoute>
                      <CategoriesTable />
                    </AdminRoute>
                  } />
                </Route>
              </Routes>
            </MainLayout>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
