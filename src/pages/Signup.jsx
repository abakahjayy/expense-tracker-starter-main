import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL, googleLoginUrl } from '../utils/config'
import { setStoredAuth, fetchCurrentUser } from '../utils/auth'
import { useToast } from '../hooks/useToast'

function Signup({ onLoggedIn }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !username || !email || !password) {
      setError("Fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, username, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.msg || data.error || 'Sign up failed. Please try again.');
      }

      const user = await fetchCurrentUser(data.token);
      const fallbackUser = { userId: data.userId, firstName, username, email };
      setStoredAuth(data.token, user || fallbackUser);
      onLoggedIn?.(user || fallbackUser);
      toast.success(`Account created — welcome, ${firstName}!`);
      navigate('/dashboard');
    } catch (err) {
      const message = err.message || 'Something went wrong. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>Create an account</h1>
        <p className="subtitle">Start tracking your income and expenses.</p>

        <a className="btn-google" href={googleLoginUrl()}>
          <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.5-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3c-7.4 0-13.8 4.1-17.1 10.1z" />
            <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 36.4 26.7 37 24 37c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.9 40.6 16.4 45 24 45z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C40.6 36 44 30.6 44 24c0-1.4-.1-2.5-.4-3.5z" />
          </svg>
          Continue with Google
        </a>

        <div className="auth-divider"><span>or</span></div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid form-grid-2">
            <label className="field">
              <span className="field-label">First name</span>
              <input
                type="text"
                placeholder="Ama"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="field">
              <span className="field-label">Last name</span>
              <input
                type="text"
                placeholder="Mensah"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <label className="field">
            <span className="field-label">Username</span>
            <input
              type="text"
              placeholder="amamensah"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div className="form-grid form-grid-2">
            <label className="field">
              <span className="field-label">Password</span>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label className="field">
              <span className="field-label">Confirm password</span>
              <input
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn-primary auth-submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup
