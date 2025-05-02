import React, { useState, useEffect } from 'react';
import { getProducts } from './productsAPI';
import { Container, Row, Col, Spinner, Pagination, Alert } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import useCart from '../../hooks/useCart';
import useFavorites from '../../hooks/useFavorites';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();



    const itemsPerPage =8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const offset = (currentPage - 1) * itemsPerPage;
                const data = await getProducts({ limit: itemsPerPage, offset : offset });
                setProducts(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


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
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {products.map(product => (
                    <Col key={product.id} className="position-relative">
                        <ProductCard
                            product={product}
                            onAddToCart={addToCart}
                            isFavorite={favorites.find((p)=> p.id == product.id)}
                            toggleFavorite={toggleFavorite}
                        />
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-center mt-4">
                <Pagination>{paginationItems}</Pagination>
            </div>
        </Container>
    );
}
