import React, { useState, useEffect } from 'react';
import { getProductCategories, getProducts } from './productsAPI';
import { Container, Row, Col, Spinner, Pagination, Alert } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard/ProductCard';
import useCart from '../../hooks/useCart';
import useFavorites from '../../hooks/useFavorites';
import ProductFilters from './ProductFilters';
import useDebounce from '../../hooks/useDebounce';

export default function ProductList() {
    const [filters, setFilters] = useState({
        categoryId: '',
        title: '',
        priceRange: [0, 1000],
        sort: '',
    });
    const debouncedFilters = useDebounce(filters, 500);

    const [products, setProducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();

    const itemsPerPage = 8;

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const getcategories = async () => {
            try {
                const data = await getProductCategories();
                setcategories(
                    data.map(item => ({
                        id: item.id,
                        name: item.name
                    }))
                );
            } catch (err) {
                setError(err.message || "Something went wrong");
            }
        };
        getcategories();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const offset = (currentPage - 1) * itemsPerPage;
                const data = await getProducts({
                    limit: itemsPerPage,
                    offset: offset,
                    ...debouncedFilters,
                });
                setProducts(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };



        fetchData();
    }, [currentPage, debouncedFilters]);



    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">Error: {error}</Alert>
            </Container>
        );
    }


    const paginationItems = [];
    for (let number = 1; number <= 8; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container className="py-5">
            <ProductFilters
                filtersn={filters}
                categories={categories}
                onFilterChange={setFilters}
            />
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {products.map(product => (
                    <Col key={product.id} className="position-relative">
                        <ProductCard
                            product={product}
                            onAddToCart={addToCart}
                            isFavorite={favorites.find((p) => p.id === product.id)}
                            toggleFavorite={toggleFavorite}
                        />
                        {/* <ProductCard
                            product={product}
                            onAddToCart={addToCart}
                            isFavorite={favorites.find((p) => p.id === product.id)}
                            toggleFavorite={toggleFavorite}
                        /> */}
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-center mt-4">
                <Pagination>{paginationItems}</Pagination>
            </div>
        </Container>
    );
}
