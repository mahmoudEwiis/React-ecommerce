
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import useCart from '../hooks/useCart';
import useFavorites from '../hooks/useFavorites';
import CartSidebar from './CartSidebar';
import FavoritesSidebar from './FavoritesSidebar';

export default function MainLayout({ children }) {
    const location = useLocation();
    const minimalRoutes = ['/login', '/register'];
    const isMinimal = minimalRoutes.includes(location.pathname);
    const { cartItems , setCartItems, removeFromCart , useCartListener } = useCart();
    const { favorites, removeFromFavorites } = useFavorites();

    const [showCart, setShowCart] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);

    const handleToggleCart = () => setShowCart(prev => !prev);
    const handleToggleFavorites = () => setShowFavorites(prev => !prev);
    
    useCartListener(setCartItems)

    if (isMinimal) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen d-flex flex-column">
            
            <header className="bg-white shadow-sm ">
                <Navbar onToggleCart={handleToggleCart} onToggleFavorites={handleToggleFavorites} />
            </header>

            
            <main className="flex-grow container mt-5 py-4">
                {children}
            </main>

            
            <footer className="bg-light text-center text-muted py-3">
                © {new Date().getFullYear()} MyShop. All rights reserved.
            </footer>

            <CartSidebar
                show={showCart}
                onClose={() => setShowCart(false)}
                cartItems={cartItems}
                onRemove={removeFromCart}
            />

            <FavoritesSidebar
                show={showFavorites}
                onClose={() => setShowFavorites(false)}
                favorites={favorites}
                onRemove={removeFromFavorites}
            />
        </div>
    );
}

