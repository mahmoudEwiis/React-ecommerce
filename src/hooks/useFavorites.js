
import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'favorites';

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === FAVORITES_KEY) {
        setFavorites(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

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
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  return { favorites, toggleFavorite, removeFromFavorites };
}
