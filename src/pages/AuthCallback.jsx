import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setStoredAuth, fetchCurrentUser } from '../auth'
import { useToast } from '../toastContext'

function AuthCallback({ onLoggedIn }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toast = useToast();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    let cancelled = false;
    (async () => {
      // Google's redirect only carries the token - fetch the actual
      // profile (name, profile_picture, ...) so the navbar has something
      // to show instead of the empty-object placeholder it used to store.
      const user = await fetchCurrentUser(token);
      if (cancelled) return;
      setStoredAuth(token, user || {});
      onLoggedIn?.(user || {});
      toast.success(`Signed in with Google${user?.firstName ? ` as ${user.firstName}` : ''}`);
      navigate('/dashboard', { replace: true });
    })();

    return () => {
      cancelled = true;
    };
    // Runs once on mount only. onLoggedIn is a new function reference on
    // every App render, so including it here (or navigate/searchParams,
    // which also change once this call updates parent state) re-triggers
    // this effect in a loop that never lets the redirect to "/" land.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="auth-page">
      <p className="subtitle">Signing you in…</p>
    </div>
  );
}

export default AuthCallback
