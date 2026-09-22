import { API_BASE_URL } from './config'

const STORAGE_KEY = 'financeTracker.auth'

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredAuth(token, user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }))
}

export function clearStoredAuth() {
  localStorage.removeItem(STORAGE_KEY)
}

// Single source of truth for "who is this token" - used after every login
// path (Google, email login, signup) so the navbar always has the same
// shape of user object (firstName, username, profile_picture, ...)
// regardless of how the user signed in.
export async function fetchCurrentUser(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      console.error(`fetchCurrentUser: /auth/dashboard returned ${res.status}`)
      return null
    }
    const data = await res.json()
    return data.user ?? null
  } catch (err) {
    console.error('fetchCurrentUser: request failed', err)
    return null
  }
}
