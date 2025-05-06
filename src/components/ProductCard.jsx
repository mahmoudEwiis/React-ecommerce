import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProductCard = ({ product, onAddToCart, isFavorite, toggleFavorite }) => {
  return (
    <Card className="position-relative product-card border-0 shadow-sm overflow-hidden h-100">
      <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
        <Card.Img
          variant="top"
          src={product.images?.[0] || product.image}
          className="object-fit-cover w-100 h-100"
        />

        <div className="icon-actions position-absolute top-50 translate-middle-y end-0 me-2 d-flex flex-column gap-2">

          <Tippy content={isFavorite ? 'Remove from favorites' : 'Add to favorites'} placement="left">
            <button
              className="btn btn-light icon-btn"
              onClick={() => toggleFavorite(product)}
            >
              {!isFavorite ? '💔' : '❤️'}
            </button>
          </Tippy>

          <Tippy content="Add to Cart" placement="left">
            <button
              className="btn btn-light icon-btn"
              onClick={() => onAddToCart(product)}
            >
              🛒
            </button>
          </Tippy>

          <Tippy content="View Details" placement="left">
            <Link to={`/products/${product.id}`} style={{ paddingTop: "3px" }} className="btn btn-light icon-btn">
              👁️
            </Link>
          </Tippy>

        </div>
      </div>

      <Card.Body>
        <Card.Title className="text-truncate">{product.title}</Card.Title>
        <Card.Text className="text-muted text-truncate">{product.category?.name}</Card.Text>
        <Card.Text className="fw-bold">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
