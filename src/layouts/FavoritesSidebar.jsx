import React from 'react';
import './Sidebar.css';
import { Button, Card } from 'react-bootstrap';

export default function FavoritesSidebar({ show, onClose, favorites = [], onRemove }) {
  return (
    <div className={`sidebar ${show ? 'show' : ''}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Favorites</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>
      <div className="sidebar-body p-3">
        {favorites.length === 0 ? (
          <p>No favorites added.</p>
        ) : (
          favorites.map(item => (
            <Card className="mb-3" key={item.id}>
              <Card.Img variant="top" src={item.images?.[0]} height={120} style={{ objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Button variant="danger" size="sm" onClick={() => onRemove(item.id)}>Delete</Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
