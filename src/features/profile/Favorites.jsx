import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = (item) => {
    setProductToDelete(item);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      removeFromFavorites(productToDelete.id);
      setProductToDelete(null);
      setShowModal(false);
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center my-5 empty-wishlist">
        <h3 className="empty-wishlist__title">Your wishlist is empty</h3>
        <p className="empty-wishlist__subtitle">
          You have no items in your wishlist. To add items to your wishlist click on the heart icon on the product page.
        </p>
        <Link to="/" className="btn text-white" style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {favorites.map((item) => (
          <div className="col-12 mb-3" key={item.id}>
            <div className="card shadow-sm p-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-2 text-center">
                  <Link to={`/products/${item.id}`} className="img-wrap d-block">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: "120px", objectFit: "cover" }}
                      onError={(e) => (e.target.src = "/assets/images/ImageNotFound.png")}
                    />
                  </Link>
                </div>

                <div className="col-md-6">
                  <Link to={`/products/${item.id}`} className="h6 d-block text-dark">
                    {item.title}
                  </Link>
                  <div className="rating-wrap d-flex align-items-center mb-2">
                    <span className="ms-2 text-warning">4.5</span>
                    <span className="mx-2 text-muted">• 154 orders</span>
                  </div>
                  <p className="text-muted small mb-1">{item.description}</p>
                  <span className="badge bg-light text-dark me-2">{item.category?.name}</span>
                  <span className="badge bg-light text-dark">Pink Color</span>
                </div>

                <div className="col-md-4 text-md-end text-center">
                  <div className="mb-2">
                    <span className="h5 text-success">${item.price}</span>
                    <del className="text-muted ms-2">${item.price + 198}</del>
                  </div>
                  <p className="text-success small mb-2">Free shipping</p>
                  <div>
                    <Link to={`/products/${item.id}`} className="btn text-white me-2 mb-2"
                    style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}>
                      Buy this
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger mb-2"
                      
                      onClick={() => handleDeleteClick(item)}
                    >
                      <i className="fa fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        item={productToDelete}
      />
    </>
  );
}
