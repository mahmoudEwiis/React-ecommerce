import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { getProductById } from '../products/productsAPI';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

import Slider from 'react-slick';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider2 = useRef(null);

    const [zoom, setZoom] = useState({
        active: false,
        x: 0,
        y: 0
    });

    const handleMouseMove = e => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoom({ active: true, x, y });
    };

    const handleMouseLeave = () => {
        setZoom(z => ({ ...z, active: false }));
    };

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

    if (loading) return <Container className="text-center py-5"><Spinner animation="border" /></Container>;
    if (error) return <Container className="py-5"><Alert variant="danger">Error: {error}</Alert></Container>;
    if (!product) return null;

    const images = product.images?.length ? product.images : [product.thumbnail];

    return (
        <Container className="py-5">
            <Link to="/" className="btn btn-link mb-4">← Back to Products</Link>
            <Row>
                <Col md={6} className="d-flex">
                    <div style={{ width: "100px", marginRight: "15px" }}>
                        <Slider
                            asNavFor={nav1}
                            ref={(slider) => {
                                setNav2(slider);
                                slider2.current = slider;
                            }}
                            slidesToShow={Math.min(4, images.length)}
                            swipeToSlide
                            focusOnSelect
                            vertical
                            verticalSwiping
                            arrows={false}
                        >
                            {images.map((img, i) => (
                                <div key={i} className=" mb-2">
                                    <img
                                        src={img}
                                        alt={`thumb-${i}`}
                                        className="img-fluid rounded border"
                                        style={{ height: "80px", objectFit: "cover", cursor: "pointer" }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="flex-grow-1 text-center w-75" style={{ width: '100%', maxWidth: '100%' }}>
                        <Slider
                            asNavFor={nav2}
                            ref={(slider) => {
                                if (slider && slider !== nav1) setNav1(slider);
                            }}
                            arrows={false}
                            fade={true}
                        >
                            {images.map((img, i) => (
                                <div key={i} className="zoom-container"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}>
                                    <img
                                        src={img}
                                        alt={`product-${i}`}
                                        className="zoom-img img-fluid mx-auto d-block rounded"
                                        style={{
                                            cursor: 'zoom-in',
                                            objectFit: 'cover',
                                            transition: 'transform 0.2s ease-out',
                                            transform: zoom.active ? 'scale(2)' : 'scale(1)',
                                            transformOrigin: `${zoom.x}% ${zoom.y}%`
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Col>

                <Col md={6}>
                    <h2>{product.title}</h2>

                    <p className="text-muted">Category:
                        <span className="badge bg-light text-dark border border-2 rounded-pill mx-2">{product.category?.name}</span>
                    </p>
                    
                    <h4 className="text-primary">${product.price}</h4>
                    <p>{product.description}</p>
                    <div className="d-flex align-items-center mt-4">
                        <Button variant="outline-primary" className="me-3" onClick={() => addToCart(product)}>
                            <FaShoppingCart className="me-1" /> Add to Cart
                        </Button>
                        <Button variant="outline-danger" onClick={() => toggleFavorite(product)}>
                            {favorites.find((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Favorite
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
