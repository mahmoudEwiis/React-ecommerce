import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Navbar = ({ onToggleCart, onToggleFavorites }) => {
    const navigate = useNavigate();
    const handkeBavigate = () =>{
        navigate('/login');
    }
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
            <FaHeart
              role="button"
              title="Favorites"
              size={20}
              className="text-danger me-3"
              onClick={onToggleFavorites}
            />
            <FaShoppingCart
              role="button"
              title="Cart"
              size={20}
              className="text-primary me-3"
              onClick={onToggleCart}
            />
            <button className="btn btn-primary" onClick={handkeBavigate}>Sign in</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
