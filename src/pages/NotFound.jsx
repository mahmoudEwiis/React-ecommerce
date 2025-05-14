import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-3">Oops! Page not found.</p>
      <p className="lead">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn mt-3 text-white" style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}>
        Go Home
      </Link>
    </div>
  );
}
