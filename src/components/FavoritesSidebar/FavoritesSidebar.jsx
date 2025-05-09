import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import './FavoritesSidebar.css'

const FavoritesSidebar = ({ isOpen, onClose }) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart, isInCart } = useCart(); 
  const [confirmId, setConfirmId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (id) => {
    setConfirmId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    removeFromFavorites(confirmId);
    setShowConfirm(false);
  };

  return (
    <>
      <div className={`wishlist sidebar ${ isOpen ? "is-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">Wishlist ({favorites.length})</div>
          <button
            aria-label="Close"
            className="btn-close"
            style={{ "--scroll-bar": "17px" }}
            onClick={onClose}
          >
            <p>Close</p>
            {/* <span role="img" aria-label="close" className="icon-close">
              <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                <path d="..."></path>
              </svg>
            </span> */}
          </button>
        </div>

        <div className="sidebar-body">
          {favorites.length === 0 ? (
            <div className="empty-sidebar">
              <div className="empty-image">
                {/* Put your SVG here */}
              </div>
              <p className="empty-description">No products in wishlist</p>
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
                      // navigate to product details
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
                <div className="item-close-btn">
                  {/* <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}
                  >
                    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                      <path d="..."></path>
                    </svg>
                  </a> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`mask ${!isOpen ? "d-none" : ""}`} onClick={onClose}></div>

      <ConfirmModal
        isVisible={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
        title="Confirm this action"
        message="Are you sure to remove product from wishlist?"
        confirmBtnText="OK"
        cancelBtnText="Cancel"
      />
    </>
  );
};

export default FavoritesSidebar;
