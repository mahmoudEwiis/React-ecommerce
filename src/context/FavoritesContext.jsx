import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (item) => {
        setFavorites(prev => {
            if (!prev.find(i => i.id === item.id)) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const toggleFavorite = (item) => {
        console.log(item)
        setFavorites(prev => {
          const exists = prev.find(f => f.id === item.id);
          if (exists) {
            toast.success('Added to favorites');
            return prev.filter(f => f.id !== item.id);
          } else {
            toast.success('Removed from favorites');
            return [...prev, item];
          }
        });
      };


    const removeFromFavorites = (id) => {
        setFavorites(prev => prev.filter(i => i.id !== id));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites  , toggleFavorite}}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
