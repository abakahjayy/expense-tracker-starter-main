import { useState } from 'react'

function getLocalDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
} 

function TransactionForm({ categories, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(categories[0] ?? "");
  const [date, setDate] = useState(getLocalDateString());
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedDescription = description.trim();
    const numericAmount = Number(amount);

    if (!trimmedDescription) {
      setError("Enter a description.");
      return;
    }
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }

    onAddTransaction({
      description: trimmedDescription,
      amount: numericAmount,
      type,
      category,
      date: date || getLocalDateString(),
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(categories[0] ?? "");
    setDate(getLocalDateString());
    setError("");
  };

  return (
    <section className="card add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="field field-description">
            <span className="field-label">Description</span>
            <input
              type="text"
              placeholder="e.g. Groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">Amount</span>
            <input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field-label">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <button type="submit" className="btn-primary">Add Transaction</button>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </section>
  );
}

export default TransactionForm
