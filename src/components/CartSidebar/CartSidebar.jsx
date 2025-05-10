
import React, { useEffect, useState } from 'react';
import './CartSidebar.css'
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    
    const { cartItems, setCartItems, removeFromCart, updateCartItemQuantity } = useCart();

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


    useEffect(() => {
        if (isOpen) {
            const stored = localStorage.getItem('cart');
            if (stored) {
                setCartItems(JSON.parse(stored));
            }
        }
    }, [isOpen]);

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowModal(true);
    };

    const handleConfirmDelete = (id) => {
        removeFromCart(id);
        setShowModal(false);
    };


    return (
        <>
            <div className={`cartlist sidebar ${isOpen ? 'is-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-title">Shopping cart ({cartCount})</div>
                    <button aria-label="Close" className="btn-close" onClick={onClose}>
                        <p>Close</p>
                        <span role="img" aria-label="close" className="icon-close">×</span>
                    </button>
                </div>

                <div className="sidebar-body">
                    {!cartCount ? (
                        <div className="empty-sidebar">
                            <p className="empty-description">No products in Cartlist</p>
                        </div>
                    ) : (
                        cartItems.map((cartItem) => (
                            <div className="item" key={cartItem.id}>
                                <div className="item-img">
                                    <img src={cartItem.images[0]} alt="product_image" />
                                </div>
                                <div className="item-description">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/products/${cartItem.id}`);
                                        }}
                                        className="item-title"
                                    >
                                        {cartItem.title}
                                    </a>
                                    <h5 className="item-price">${cartItem.price}</h5>
                                    <div className="quantity-selector">
                                        <button
                                            className="btn btn-quantity"
                                            onClick={() =>
                                                updateCartItemQuantity(cartItem, '-')
                                            }
                                            disabled={cartItem.quantity === 1}
                                        >
                                            -
                                        </button>
                                        <div className="quantity-number">{cartItem.quantity}</div>
                                        <button
                                            className="btn btn-quantity"
                                            onClick={() =>
                                                updateCartItemQuantity(cartItem, '+')
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="item-close-btn"
                                    onClick={() => handleDeleteClick(cartItem)}>
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartCount > 0 && (
                    <div className="sidebar-total">
                        <h5 className="total-price">
                            Total: <span>${totalPrice}</span>
                        </h5>
                        <div className="checkout-btn d-flex">
                            <button className="btn btn-warning" onClick={() => navigate('/checkout')}>
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`mask ${!isOpen ? 'd-none' : ''}`} onClick={onClose}></div>

            <DeleteConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                product={productToDelete}
            />

        </>
    );
};

export default CartSidebar;
