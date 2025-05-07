import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const isInCart = (product) => {
        const cartItemExist = cartItems.find((item) => item.id === product.id);
        return cartItemExist;
    };

    const updateCartItemQuantity = (id, action) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: action === '+' ? item.quantity + 1 : item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartItemQuantity,
            setCartItems,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
