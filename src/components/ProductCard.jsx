import { Card, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, isFavorite, toggleFavorite }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.images?.[0]}
          alt={product.title}
          style={{ objectFit: 'contain', height: '250px' }}
        />
        <div
          className="position-absolute top-0 end-0 p-2"
          onClick={() => toggleFavorite(product.id)}
          style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#dc3545' }}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 text-truncate">{product.title}</Card.Title>
        <Card.Text className="text-muted mb-1">{product.category.name}</Card.Text>
        <div className="fw-bold mb-2">${product.price}</div>
        <Button
          variant="primary"
          onClick={() => onAddToCart(product)}
          className="mt-auto"
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
