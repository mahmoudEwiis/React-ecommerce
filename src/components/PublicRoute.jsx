import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (token && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error('You are already logged in!');
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  if (token) return null;
  return children;
}
