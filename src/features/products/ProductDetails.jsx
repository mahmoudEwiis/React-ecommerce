import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { getProductById, getProductsByCategory } from '../products/productsAPI';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

import Slider from 'react-slick';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function ProductDetails() {
    const { id } = useParams();
    const relatedSliderRef = useRef(null);

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, isInCart, updateCartItemQuantity, cartItems } = useCart();
    const { favorites, toggleFavorite } = useFavorites();

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider2 = useRef(null);

    const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });

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
                if (data.category?.id) {
                    const relatedData = await getProductsByCategory(data.category.id);
                    const filtered = relatedData.filter(p => p.id !== data.id);
                    setRelated(filtered);
                }
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
    const inCart = isInCart(product);
    const quantity = cartItems.find(item => item.id === product.id)?.quantity || 1;


    const relatedSettings = {
        slidesToShow: 5,
        infinite: true,
        arrows: false,
        autoplay: false,
    };

    return (
        <Container className="py-5">
            <Link to="/" className="btn btn-link mb-4">← Back to Products</Link>
            <Row className='align-items-center'>
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

                    <div className="flex-grow-1 text-center w-75">
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

                <Col md={6} className='productDetials'>
                    <h2>{product.title}</h2>
                    <p>
                        <span className="badge border border-2 rounded-pill mx-2">{product.category?.name}</span>
                    </p>
                    <h4 className="price">${product.price}</h4>
                    <p className='mb-4'>{product.description}</p>

                    <div className="d-flex align-items-center gap-2 mt-4">
                        {inCart ? (
                            <>
                                <Button variant="outline-secondary" disabled={quantity === 1}  onClick={() => updateCartItemQuantity(product, '-')}  >-</Button>
                                <span>{quantity}</span>
                                <Button variant="outline-secondary" onClick={() => updateCartItemQuantity(product, '+')}>+</Button>
                                <Button className='btnAddToCart active' disabled>Added to Cart</Button>
                            </>
                        ) : (
                            <Button className='btnAddToCart' onClick={() => addToCart(product)}>
                                <FaShoppingCart className="me-1" /> Add to Cart
                            </Button>
                        )}

                        <Button variant="outline-danger" onClick={() => toggleFavorite(product)}>
                            {favorites.find(item => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Favorite
                        </Button>
                    </div>
                </Col>
            </Row>

            {related.length > 0 && (
                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center p-2 my-4">
                        <h4 className="">More in {product.category.name}</h4>
                        <div>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                className="me-2"
                                onClick={() => relatedSliderRef.current.slickPrev()}
                            >
                                <FaChevronLeft />
                            </Button>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => relatedSliderRef.current.slickNext()}
                            >
                                <FaChevronRight />
                            </Button>
                        </div>
                    </div>

                    <Slider
                        ref={relatedSliderRef} {...relatedSettings}
                    >
                        {related.map(prod => (
                            <div key={prod.id} className="px-2"
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                <ProductCard
                                    product={prod}
                                    onAddToCart={addToCart}
                                    isFavorite={favorites.find((p) => p.id === product.id)}
                                    toggleFavorite={toggleFavorite}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </Container>
    );
}
