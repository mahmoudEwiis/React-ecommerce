
import React, { useEffect, useState } from 'react';

import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/sidebar.css'
import './CartSidebar.css'

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
                <div className="sidebar-header justify-content-between align-items-center">
                    <div className="sidebar-title text-nowrap">Shopping cart ({cartCount})</div>
                    <button aria-label="Close" className="btn-close" onClick={onClose}>
                        <span role="img" aria-label="close" className="icon-close"></span>
                    </button>
                </div>

                <div className="sidebar-body">
                    {!cartCount ? (
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
                                <p className="empty-description text-black ">No products in Cartlist</p>
                            </div>
                        </div>
                    ) : (
                        cartItems.map((cartItem) => (
                            <div className="item" key={cartItem.id}>
                                <div className="item-img">
                                    <img src={cartItem.images[0]} alt="product_image" />
                                </div>
                                <div className="item-description flex-grow-1">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClose();
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
                                    <i class="fa-solid fa-xmark text-black" style={{ cursor: 'pointer' }}></i>
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
                            <button className="btn" onClick={() => { onClose(); navigate('/checkout') }}>
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
                item={productToDelete}
            />

        </>
    );
};

export default CartSidebar;
