import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useProfile } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const { profile } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!token && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error('You need to log in first!');
      navigate('/login', { replace: true, state: { from: location } });
    } else if (profile && profile.role !== 'admin' && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error('You are not authorized to access this page!');
      navigate('/unauthorized', { replace: true });
    }
  }, [token, profile, navigate, location]);

  if (!token || (profile && profile.role !== 'admin')) return null;

  return children;
}
