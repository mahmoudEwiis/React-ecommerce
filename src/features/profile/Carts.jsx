import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { useCart } from "../../context/CartContext";

export default function Carts() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();

    const [showModal, setShowModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    const handleRemoveClick = (item) => {
        setItemToRemove(item);
        setShowModal(true);
    };

    const handleConfirmRemove = () => {
        if (itemToRemove) {
            removeFromCart(itemToRemove.id);
            setItemToRemove(null);
            setShowModal(false);
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center my-5 empty-wishlist">
                <div className="empty-wishlist__icon mb-4">

                </div>
                <h3 className="empty-wishlist__title">Your cart is empty</h3>
                <p className="empty-wishlist__subtitle">
                    You have no items in your cart. Browse products and click “Add to Cart” to fill it up.
                </p>
                <Link to="/" className="btn text-white" style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}>Continue Shopping</Link>
            </div>
        );
    }

    return (
        <>
            <div className="row">
                {cartItems.map((item) => (
                    <div className="col-12 mb-3" key={item.id}>
                        <div className="card shadow-sm p-3">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-2 text-center">
                                    <Link to={`/products/${item.id}`} className="d-block">
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
                                    <p className="text-muted small mb-1">{item.description}</p>
                                    <div className="d-flex justify-content-start align-items-center mb-2">
                                        <span className="badge bg-light text-dark me-2">{item.category?.name}</span>
                                        <div className="d-flex justify-content-center justify-content-md-end align-items-center mb-2">
                                            <button
                                                className="btn btn-sm btn-outline-secondary me-2"
                                                onClick={() => updateCartItemQuantity(item, "-")}
                                                disabled={item.quantity === 1 }
                                            >
                                                &minus;
                                            </button>
                                            <span className="fw-bold">{item.quantity}</span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary ms-2"
                                                onClick={() => updateCartItemQuantity(item, "+")}
                                            >
                                                &#43;
                                            </button>
                                        </div>
                                    </div>


                                </div>

                                <div className="col-md-4 text-md-end text-center">

                                    <div className="mb-2">
                                        <span className="h5 text-success">${item.price}</span>
                                        <del className="text-muted ms-2">${item.price + 198}</del>
                                    </div>
                                    <p className="text-success small mb-2">Free shipping</p>

                                    <div>
                                        <button
                                            className="btn text-white me-2 mb-2"
                                            style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}
                                            onClick={() => navigate("/checkout")}
                                        >
                                            Buy this
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger mb-2"
                                            onClick={() => handleRemoveClick(item)}
                                        >
                                            <i className="fa fa-trash"></i>
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
                onConfirm={handleConfirmRemove}
                item={itemToRemove}
            />
        </>
    );
}


