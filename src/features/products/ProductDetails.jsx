import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { getProductById } from '../products/productsAPI';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [favorites, setFavorites] = useState(() => {
        const fav = localStorage.getItem('favorites');
        return fav ? JSON.parse(fav) : [];
    });

    const [cart, setCart] = useState(() => {
        const c = localStorage.getItem('cart');
        return c ? JSON.parse(c) : [];
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const toggleFavorite = () => {
        setFavorites((prev) => {
          const numericId = Number(id);
          const isFavorite = prev.includes(numericId);
      
          if (isFavorite) {
            toast.success('Removed from favorites');
            return prev.filter((favId) => favId !== numericId);
          } else {
            toast.success('Added to favorites');
            return [...prev, numericId];
          }
        });
      };

    const handleAddToCart = () => {
        if (!product) return;
        setCart(prev => {
            const item = prev.find(i => i.product.id === product.id);
            if (item) {
                toast.success('Increased product quantity');
                return prev.map(i =>
                    i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            toast.success('Added to cart');
            return [...prev, { product, quantity: 1 }];
        });
    };

    if (loading) return <Container className="text-center py-5"><Spinner animation="border" /></Container>;
    if (error) return <Container className="py-5"><Alert variant="danger">Error: {error}</Alert></Container>;
    if (!product) return null;

    return (
        <Container className="py-5">
            <Link to="/" className="btn btn-link mb-4">← Back to Products</Link>
            <Row>
                <Col md={6} className="text-center">
                    <Image src={product.images?.[0] || product.thumbnail} fluid style={{ maxHeight: '400px', objectFit: 'cover' }} />
                </Col>
                <Col md={6}>
                    <h2>{product.title}</h2>
                    <p className="text-muted">Category: {product.category?.name}</p>
                    <h4 className="text-primary">${product.price}</h4>
                    <p>{product.description}</p>
                    <div className="d-flex align-items-center mt-4">
                        <Button variant="outline-primary" className="me-3" onClick={handleAddToCart}>
                            <FaShoppingCart className="me-1" /> Add to Cart
                        </Button>
                        <Button variant="outline-danger" onClick={toggleFavorite}>
                            {favorites.includes(product.id) ? <FaHeart /> : <FaRegHeart />} Favorite
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
