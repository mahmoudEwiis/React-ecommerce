import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import '../../styles/sidebar.css'
import './FavoritesSidebar.css'
import { useNavigate } from "react-router-dom";

const FavoritesSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleConfirmDelete = (id) => {
    removeFromFavorites(id);
    setShowModal(false);
  };


  return (
    <>
      <div className={`wishlist sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar-header  justify-content-between align-items-center">
          <div className="sidebar-title">Wishlist ({favorites.length})</div>
          <button
            aria-label="Close"
            className="btn-close"
            style={{ "--scroll-bar": "17px" }}
            onClick={onClose}
          >
            <span role="img" aria-label="close" className="icon-close"></span>
          </button>
        </div>

        <div className="sidebar-body">
          {favorites.length === 0 ? (
            <div className="empty-sidebar d-flex align-items-center justify-content-center h-100">


              <div>
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6c757d"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <p className="empty-description text-black ">No products in wishlist</p>
              </div>
            </div>
          ) : (
            favorites.map((item) => (
              <div className="item" key={item.id}>
                <div className="item-img">
                  <img
                    src={item.images[0]}
                    alt="product_image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/images/ImageNotFound.png";
                    }}
                  />
                </div>
                <div className="item-description">
                  <a
                    href="#"
                    className="item-title"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      navigate(`/products/${item.id}`);

                    }}
                  >
                    {item.title}
                  </a>
                  <h5 className="item-price">${item.price}</h5>
                  <button
                    type="button"
                    className="btn-add btn-mobile-add"
                    disabled={isInCart(item)}
                    onClick={() => addToCart(item)}
                  >
                    <i className="fa-solid fa-clipboard"></i>
                  </button>
                  <button
                    type="button"
                    className="btn-add btn-large-add"
                    disabled={isInCart(item)}
                    onClick={() => addToCart(item)}
                  >
                    <span>Added to cart</span>
                  </button>
                </div>
                <div className="item-close-btn "
                  onClick={() => handleDeleteClick(item)}>
                  <i class="fa-solid fa-xmark text-black"></i>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`mask ${!isOpen ? "d-none" : ""}`} onClick={onClose}></div>

      <DeleteConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        item={productToDelete}
      />
    </>
  );
};

export default FavoritesSidebar;
