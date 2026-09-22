const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card summary-card--income">
        <span className="summary-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
          </svg>
        </span>
        <div>
          <h3>Income</h3>
          <p className="income-amount">{currencyFormatter.format(totalIncome)}</p>
        </div>
      </div>

      <div className="summary-card summary-card--expense">
        <span className="summary-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" /><path d="M19 12l-7 7-7-7" />
          </svg>
        </span>
        <div>
          <h3>Expenses</h3>
          <p className="expense-amount">{currencyFormatter.format(totalExpenses)}</p>
        </div>
      </div>

      <div className="summary-card summary-card--balance">
        <span className="summary-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
          </svg>
        </span>
        <div>
          <h3>Balance</h3>
          <p className={`balance-amount ${balance < 0 ? 'balance-amount--negative' : ''}`}>
            {currencyFormatter.format(balance)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary
