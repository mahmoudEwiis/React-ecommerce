import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { isLogged, logout } from '../features/auth/authAPI';
import { useProfile } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
const Navbar = ({ onToggleCart, onToggleFavorites }) => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isUserLogged = isLogged();
  const handkeBavigate = () => {
    navigate('/login');
  }
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top p-3 rounded shadow-sm ">
      <div className="container">
        <Link className="navbar-brand col-lg-3 me-0" to="/">MyShop</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex justify-content-lg-between" id="navbarsExample11">
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>

          <div className="d-lg-flex col-lg-3 justify-content-lg-end align-items-center gap-3">

            <div className='navIcon mx-2' onClick={onToggleFavorites} >
              <span class="badge badge-light">{favorites.length}</span>
              <i class="fa-solid fa-heart"></i>
            </div>

            <div className='navIcon mx-2' onClick={onToggleCart}>
              <span class="badge badge-light">{cartCount}</span>
              <i class="fa-solid fa-cart-plus"></i>
            </div>

            {
              !isUserLogged ? (
                <button className="btn text-nowrap btn-login" onClick={handkeBavigate}>Sign in</button>
              ) : (
                <li className="nav-item ms-3 dropdown">
                  <img
                    className="avatar-img rounded-circle"
                    width={40}
                    src={profile?.avatar || "/avatar.jpg"}
                    alt="avatar"
                    id="profileDropdown"
                    role="button"
                    data-bs-auto-close="outside"
                    data-bs-display="static"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />

                  <ul
                    className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
                    aria-labelledby="profileDropdown"
                  >
                    <li className="px-3 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                          <img
                            className="avatar-img rounded-circle shadow"
                            width={40}
                            src={profile?.avatar || "/avatar.jpg"}
                            alt="avatar"
                          />
                        </div>
                        <div>
                          <a className="h6 mt-2 mt-sm-0" href="#">
                            {profile?.name}
                          </a>
                          <p className="small m-0">
                            {profile?.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    <li><hr className="dropdown-divider" /></li>

                    <li>
                      <Link to="/profile" className="dropdown-item">
                        <i className="fa-regular fa-user me-2"></i>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile/favorites" className="dropdown-item">
                        <i className="fa-solid fa-heart text-danger me-2"></i>
                        My Wishlist
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item bg-danger-soft-hover text-danger" onClick={handleLogout}>
                        <i className="fa-solid fa-power-off me-2"></i>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </li>
              )
            }

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
