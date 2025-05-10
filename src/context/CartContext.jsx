import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
                toast.success('Removed from cart Items');
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                toast.success('Added to cart Items');
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

    const updateCartItemQuantity = (item, action) => {
        const updatedItems = cartItems.map(ci =>
            ci.id === item.id
                ? { ...ci, quantity: action === '+' ? ci.quantity + 1 : ci.quantity - 1 }
                : ci
        ).filter(ci => ci.quantity > 0);
        if(action === '+')  toast.success('Increase cart Item Quantity');
        else toast.success('Decrease cart Item Quantity');
        setCartItems(updatedItems);
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
