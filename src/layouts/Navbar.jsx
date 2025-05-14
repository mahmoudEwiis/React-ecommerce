import { Link, useNavigate } from 'react-router-dom';
import { logout, isLogged } from '../features/auth/authAPI';
import { useProfile } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onToggleCart, onToggleFavorites }) => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const isAdmin = profile?.role === 'admin';
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isUserLogged = isLogged();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar bg-body-tertiary fixed-top p-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">

        <div className="">
          <Link className="navbar-brand fw-bold" to="/"  style={{ color: '#6666AF' }}>MyShop</Link>
        </div>

        <div className="d-flex align-items-center gap-3 ">

          <div className="navIcon position-relative" onClick={onToggleFavorites}>
            <span className="badge bg-danger translate-middle">{favorites.length}</span>
            <i className="fa-solid fa-heart"></i>
          </div>

          <div className="navIcon position-relative" onClick={onToggleCart}>
            <span className="badge bg-primary translate-middle">{cartCount}</span>
            <i className="fa-solid fa-cart-plus"></i>
          </div>

          {!isUserLogged ? (
            <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>Sign In</button>
          ) : (
            <div className="position-relative">
              <img
                className="avatar-img rounded-circle"
                width={40}
                src={profile?.avatar || "/avatar.jpg"}
                alt="avatar"
                role="button"
                onClick={handleMenuClick}
              />

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.ul
                    className="dropdown-menu show position-absolute end-0 mt-2 p-3 shadow"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: 1000, minWidth: 220 }}
                  >
                    <li className="mb-2">
                      <div className="d-flex align-items-center">
                        <img className="rounded-circle me-2" src={profile?.avatar || "/avatar.jpg"} alt="avatar" width={40} />
                        <div>
                          <div className="fw-bold">{profile?.name}</div>
                          <small className="text-muted">{profile?.email}</small>
                        </div>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to="/profile" className="dropdown-item" onClick={handleMenuClose}>My Profile</Link></li>
                    <li><Link to="/profile/favorites" className="dropdown-item" onClick={handleMenuClose}>My Wishlist</Link></li>
                    <li>
                      <Link to="/profile/cart" className="dropdown-item" onClick={handleMenuClose}>
                       My Cart
                      </Link>
                    </li>
                    <li hidden={!isAdmin}>
                      <Link to="/profile/products" className="dropdown-item" onClick={handleMenuClose}>
                        Products
                      </Link>
                    </li>
                    <li hidden={!isAdmin}>
                      <Link to="/profile/categories" className="dropdown-item" onClick={handleMenuClose}>
                        Categories
                      </Link>
                    </li>
                    <li hidden={!isAdmin}>
                      <Link to="/profile/users" className="dropdown-item" onClick={handleMenuClose}>
                        Users
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={() => { handleLogout(); handleMenuClose(); }}>
                        Sign Out
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
