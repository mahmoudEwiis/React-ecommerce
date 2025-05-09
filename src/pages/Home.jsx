import React, { useState, useEffect } from 'react';
import ProductList from '../features/products/ProductList';
import ProductFilters from '../features/products/ProductFilters';
import { getProductCategories } from '../features/products/productsAPI';
import useDebounce from '../hooks/useDebounce';

export default function Home() {
  const [filters, setFilters] = useState({
    categoryId: '',
    title: '',
    priceRange: [0, 1000],
    sort: '',
  });
  const [categories, setCategories] = useState([]);
  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    const getCategories = async () => {
      const data = await getProductCategories();
      setCategories(
        data.map(item => ({
          id: item.id,
          name: item.name,
        }))
      );
    };
    getCategories();
  }, []);

  return (
    <>
      <div className="container pt-5">
        <ProductFilters
          filtersn={filters}
          categories={categories}
          onFilterChange={setFilters}
        />
        <ProductList filters={debouncedFilters} />
      </div>

    </>
  );
}
