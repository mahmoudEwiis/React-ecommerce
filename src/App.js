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
import Carts from './features/profile/Carts';
import Checkout from './features/checkout/Checkout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <MainLayout>
              <ScrollToTop>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products/:id" element={<ProductPage />} />
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>

                  } />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
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
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfileLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="favorites" element={
                      <ProtectedRoute>
                        <Favorites />
                      </ProtectedRoute>
                    } />
                    <Route path="Carts" element={
                      <ProtectedRoute>
                        <Carts />
                      </ProtectedRoute>
                    } />
                    <Route path="products" element={
                      <ProtectedRoute>
                        <AdminRoute>
                          <ProductsTable />
                        </AdminRoute>
                      </ProtectedRoute>

                    } />
                    <Route path="users" element={
                      <ProtectedRoute>
                        <AdminRoute>
                          <UsersTable />
                        </AdminRoute>
                      </ProtectedRoute>

                    } />
                    <Route path="categories" element={
                      <ProtectedRoute>
                        <AdminRoute>
                          <CategoriesTable />
                        </AdminRoute>
                      </ProtectedRoute>

                    } />
                  </Route>
                </Routes>
              </ScrollToTop>
            </MainLayout>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
