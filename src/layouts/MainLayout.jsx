
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import CartSidebar from '../components/CartSidebar/CartSidebar';
import FavoritesSidebar from '../components/FavoritesSidebar/FavoritesSidebar';

export default function MainLayout({ children }) {
    const location = useLocation();
    const minimalRoutes = ['/login', '/register'];
    const isMinimal = minimalRoutes.includes(location.pathname);

    const [showCart, setShowCart] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);

    const handleToggleCart = () =>  setShowCart(prev => !prev);
    const handleToggleFavorites = () =>  setShowFavorites(prev => !prev);


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


            <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />


            <FavoritesSidebar
                isOpen={showFavorites}
                onClose={() => setShowFavorites(false)}
            />
        </div>
    );
}

