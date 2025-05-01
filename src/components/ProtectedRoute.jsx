
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!token && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error('You need to log in first!');
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [token, navigate, location]);

  if (!token) return null;
  return children;
}
