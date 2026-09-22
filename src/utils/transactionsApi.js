import { API_BASE_URL } from './config'

async function request(path, token, options = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/transactions${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data.msg || data.message || data.error || 'Something went wrong. Please try again.'
    const err = new Error(message)
    // Lets callers tell "your token is bad, log in again" apart from
    // ordinary validation errors (both arrive as rejected promises here).
    err.isAuthError = res.status === 401
    throw err
  }
  return data
}

// Backend transactions use Mongo's `_id` and store `date` as a full ISO
// timestamp; the rest of the UI (TransactionList's key/date parsing,
// TransactionForm's onAddTransaction) was built around a plain `id` and a
// "YYYY-MM-DD" string, so normalize each transaction once here rather than
// touching every component that reads it.
const normalize = (t) => ({ ...t, id: t._id, date: t.date.slice(0, 10) })

export async function listTransactions(token, options) {
  const data = await request('', token, options)
  return (data.transactions || []).map(normalize)
}

export async function addTransaction(token, transaction) {
  const data = await request('', token, {
    method: 'POST',
    body: JSON.stringify(transaction),
  })
  return normalize(data.transaction)
}

export async function removeTransaction(token, id) {
  await request(`/${id}`, token, { method: 'DELETE' })
}
