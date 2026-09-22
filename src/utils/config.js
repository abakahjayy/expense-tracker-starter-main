export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7004'

// Wherever this app is actually running (localhost:5173 in dev, its real
// domain in prod) - the backend sends the Google login token back here.
export const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/callback`

export const googleLoginUrl = () =>
  `${API_BASE_URL}/api/v1/auth/google?redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}`
