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
