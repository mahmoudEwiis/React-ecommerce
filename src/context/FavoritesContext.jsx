import { createContext, useContext, useEffect, useState } from 'react';

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
            return prev.filter(f => f.id !== item.id);
          } else {
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
