import React, { useState } from 'react';
import './CartSidebar.css'
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const CartSidebar = ({ cartList, isOpen, onClose, updateCartItemQuantity, navigateToProductDetails, navigateToCheckout, removeCartItem }) => {

    const cartCount = cartList.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartList.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const [isVisible, setIsVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const openConfirmModal = (productId) => {
        setSelectedProductId(productId);
        setIsVisible(true);
    };

    const closeConfirmModal = () => {
        setIsVisible(false);
        setSelectedProductId(null);
    };

    const deleteCartItem = () => {
        if (selectedProductId) {
            removeCartItem(selectedProductId); // الدالة الجاية من البارنت أو من context
        }
        closeConfirmModal();
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
                        cartList.map((cartItem) => (
                            <div className="item" key={cartItem.id}>
                                <div className="item-img">
                                    <img src={cartItem.images[0]} alt="product_image" />
                                </div>
                                <div className="item-description">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigateToProductDetails(cartItem.id);
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
                                                updateCartItemQuantity(cartItem.quantity, cartItem, '-')
                                            }
                                            disabled={cartItem.quantity === 1}
                                        >
                                            -
                                        </button>
                                        <div className="quantity-number">{cartItem.quantity}</div>
                                        <button
                                            className="btn btn-quantity"
                                            onClick={() =>
                                                updateCartItemQuantity(cartItem.quantity, cartItem, '+')
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="item-close-btn">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openConfirmModal(cartItem.id);
                                        }}
                                    >
                                        ×
                                    </a>
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
                            <button className="btn btn-warning" onClick={navigateToCheckout}>
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`mask ${!isOpen ? 'd-none' : ''}`} onClick={onClose}></div>

            <ConfirmModal
                isVisible={isVisible}
                title="Confirm this action"
                message="Are you sure to remove product from cart?"
                confirmBtnText="Ok"
                cancelBtnText="Cancel"
                onConfirm={deleteCartItem}
                onCancel={closeConfirmModal}
            />
        </>
    );
};

export default CartSidebar;
