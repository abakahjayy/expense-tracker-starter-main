import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Summary from '../Summary'
import TransactionForm from '../TransactionForm'
import TransactionList from '../TransactionList'
import { useToast } from '../toastContext'
import { getStoredAuth } from '../auth'
import { listTransactions, addTransaction, removeTransaction } from '../transactionsApi'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function Dashboard({ onSessionExpired }) {
  const toast = useToast();
  const navigate = useNavigate();
  const token = getStoredAuth()?.token;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // A 401 here means the token itself is bad (stale, or its user no longer
  // exists) rather than "this one request failed" - retrying with the same
  // token will only fail again, so drop the session instead of toasting
  // the same error on every subsequent request.
  const handleAuthError = () => {
    onSessionExpired?.();
    navigate('/login');
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    // StrictMode mounts every effect twice in dev (mount, cleanup, mount
    // again) to flush out exactly this kind of bug. An AbortController
    // actually cancels the first fetch instead of just ignoring its
    // result, so only one request ever reaches the server.
    const controller = new AbortController();
    listTransactions(token, { signal: controller.signal })
      .then((data) => setTransactions(data))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        if (err.isAuthError) {
          handleAuthError(err);
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => {
      controller.abort();
    };
    // Only re-fetch if the token itself changes (login/logout); toast,
    // navigate and handleAuthError are stable enough for this effect's
    // purposes (see Toast.jsx) and re-running it on their identity isn't
    // what we want here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleAddTransaction = async ({ description, amount, type, category, date }) => {
    try {
      const created = await addTransaction(token, { description, amount, type, category, date });
      setTransactions((prev) => [...prev, created]);
      toast.success(`Added "${created.description}"`);
    } catch (err) {
      if (err.isAuthError) {
        handleAuthError(err);
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleDeleteTransaction = async (id) => {
    const removed = transactions.find(t => t.id === id);
    try {
      await removeTransaction(token, id);
      setTransactions((prev) => prev.filter(t => t.id !== id));
      toast.info(removed ? `Deleted "${removed.description}"` : 'Transaction deleted');
    } catch (err) {
      if (err.isAuthError) {
        handleAuthError(err);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <div className="page-intro">
        <h1>Finance Tracker</h1>
        <p className="subtitle">Track your income and expenses</p>
      </div>

      {!token ? (
        <section className="card">
          <p>
            <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link> to see and track your own transactions.
          </p>
        </section>
      ) : loading ? (
        <section className="card">
          <p className="empty-state">Loading your transactions…</p>
        </section>
      ) : (
        <>
          <Summary transactions={transactions} />

          <TransactionForm categories={categories} onAddTransaction={handleAddTransaction} />

          <TransactionList
            transactions={transactions}
            categories={categories}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </>
      )}
    </>
  );
}

export default Dashboard
