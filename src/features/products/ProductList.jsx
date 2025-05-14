import React, { useState, useEffect } from 'react';
import { getProducts } from './productsAPI';
import { Container, Row, Col, Spinner, Pagination, Alert } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './product.css';

export default function ProductList({ filters }) {
    const [products, setProducts] = useState([]);
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
        const fetchData = async () => {
            try {
                setLoading(true);
                const offset = (currentPage - 1) * itemsPerPage;
                const data = await getProducts({
                    limit: itemsPerPage,
                    offset: offset,
                    ...filters,
                });

                let sortedData = [...data];

                if (filters.sort) {
                    switch (filters.sort) {
                        case 'name_asc':
                            sortedData.sort((a, b) => a.title.localeCompare(b.title));
                            break;
                        case 'name_desc':
                            sortedData.sort((a, b) => b.title.localeCompare(a.title));
                            break;
                        case 'price_asc':
                            sortedData.sort((a, b) => a.price - b.price);
                            break;
                        case 'price_desc':
                            sortedData.sort((a, b) => b.price - a.price);
                            break;
                        default:
                            break;
                    }
                }

                setProducts(sortedData);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, filters]);

    if (loading) {
        return <Container fluid className="vh-100 d-flex justify-content-center align-items-center">  <Spinner animation="border" /> </Container>;
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
        <Container className="py-3">
            {products.length === 0 ? (
                <div className="text-center w-100 py-5">
                    <svg
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6c757d"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-4"
                    >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <h4 className="text-white">No products found</h4>
                    <p className="text-secondary">Try adjusting your filters or check back later.</p>
                </div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {products.map(product => (
                        <Col key={product.id} className="position-relative">
                            <ProductCard
                                product={product}
                                onAddToCart={addToCart}
                                isFavorite={favorites.find((p) => p.id === product.id)}
                                toggleFavorite={toggleFavorite}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            <div className="d-flex justify-content-center mt-4">
                <Pagination className='customPagination'>{paginationItems}</Pagination>
            </div>
        </Container>
    );
}
