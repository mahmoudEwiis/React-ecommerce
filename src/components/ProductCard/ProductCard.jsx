import React from 'react';
import './ProductCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, isFavorite, toggleFavorite }) => {
  return (
    <div className="card-product style-4 rounded">
      <div className="card-product-wrapper radius-16 line-2">
        <Link to={`/products/${product.id}`} className="product-img">
          <img
            className="img-product"
            src={product.images?.[0] || product.image}
            alt="image-product"
          />
          <img
            className="img-hover"
            src={product.images?.[1] || product.images?.[0] || product.image }
            alt="image-product"
          />
        </Link>
        <ul className="list-product-btn">
          <li>

            <button onClick={() => onAddToCart(product)}
              className="bg-surface hover-tooltip tooltip-left box-icon">
              <i className="fas fa-shopping-cart"></i>
              <span className="tooltip">Add to Cart</span>
            </button>

          </li>
          <li className="wishlist">
            <button onClick={() => toggleFavorite(product)}
              className="bg-surface hover-tooltip tooltip-left box-icon">
              <i class="fa-regular fa-heart"></i>
              <span className="tooltip">Add to Wishlist</span>
            </button>
          </li>
          <li>
            <Link to={`/products/${product.id}`} className="bg-surface hover-tooltip tooltip-left box-icon">
              <i className="fa-solid fa-eye"></i>
              <span className="tooltip">Quick View</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="card-product-info">

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Link to={`/products/${product.id}`} className=" d-block  text-dark name-product fw-medium text-md">
            {product.title}
          </Link>
          <span class="badge bg-light text-dark border border-2 rounded-pill">{product.category?.name}</span>
        </div>

        <p className="price-wrap fw-medium ">
          <span className="price-new">${product.price}</span>
        </p>

      </div>
    </div>
  );
};

export default ProductCard;
