import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setStoredAuth } from '../auth'

function AuthCallback({ onLoggedIn }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setStoredAuth(token, {});
      onLoggedIn?.({});
    }
    navigate('/', { replace: true });
  }, [searchParams, navigate, onLoggedIn]);

  return (
    <div className="auth-page">
      <p className="subtitle">Signing you in…</p>
    </div>
  );
}

export default AuthCallback
