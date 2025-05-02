import { useEffect, useState } from 'react';

const CART_KEY = 'cart';

export default function useCart() {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }, [cartItems]);



    const addToCart = (item) => {
        const existing = cartItems.find(i => i.id === item.id);
        if (existing) {
            setCartItems(prev =>
                prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            );
        } else {
            setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
        }
    };


    const removeFromCart = (idToRemove) => {
        setCartItems(prev =>
            prev.filter(item => item.id !== idToRemove)
        );

        console.log("cartItems" , cartItems)
    };

    const useCartListener = (setCartItems) => {
        useEffect(() => {
          const storageEventHandler = (event) => {
            if (event.key === "cart") {
              const updatedCart = JSON.parse(event.newValue) || [];
              setCartItems(updatedCart);
            }
          };
      
          window.addEventListener("storage", storageEventHandler);
      
          return () => {
            window.removeEventListener("storage", storageEventHandler);
          };
        }, [setCartItems]);
      };

      
    return { cartItems , setCartItems, addToCart, removeFromCart  , useCartListener};
}
