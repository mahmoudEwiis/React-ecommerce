import React from 'react';
import './Sidebar.css';
import { Button, Card } from 'react-bootstrap';


export default function CartSidebar({ show, onClose, cartItems = [], onRemove }) {
    return (
        <div className={`sidebar ${show ? 'show' : ''}`}>
            <div className="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="mb-0">Cart</h5>
                <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="sidebar-body p-3  h-100">
                {cartItems.length === 0 ? (
                    <>
                        <div className="row align-items-center  h-100 text-center">
                            <div class="col-12">
                                <div class="empty-info">
                                    <div class="section-capture" data-animate="animate__fadeIn">
                                        <div class="section-title">
                                            <h2 class="section-heading">No Cart item yet</h2>
                                        </div>
                                    </div>
                                    <img src="/empty-wish.png" class="width-160 img-fluid meb-26" alt="empty-wish" data-animate="animate__fadeIn" width="160" height="160" />
                                    <h6 class="font-18" data-animate="animate__fadeIn">Sorry your wishlist has currently no more products, click on 'explore products' button given below for continue browsing.</h6>
                                    <a href="collection.html" class="btn-style secondary-btn mst-25" data-animate="animate__fadeIn">Explore products</a>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    cartItems.map(item => (
                        <Card className="mb-3" key={item.id}>
                            <Card.Img variant="top" src={item.images?.[0]} height={120} style={{ objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>Quantity: {item.quantity}</Card.Text>
                                <Button variant="danger" size="sm" onClick={() => onRemove(item.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
