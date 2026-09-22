import { Link } from 'react-router-dom'
import { getStoredAuth } from '../auth'

const FEATURES = [
  {
    title: 'Track every transaction',
    description: 'Log income and expenses in seconds, with a category and date attached to each one.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    title: 'See your balance instantly',
    description: 'Income, expenses and balance are summarized live at the top of your dashboard.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 15l4-6 3 3 5-8" />
      </svg>
    ),
  },
  {
    title: 'Filter & categorize',
    description: 'Slice your spending by type or category to see exactly where your money goes.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16M7 12h10M10 19h4" />
      </svg>
    ),
  },
  {
    title: 'Your data, secured',
    description: 'Every account is protected behind sign-in, so your transactions stay private to you.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
      </svg>
    ),
  },
];

function Landing() {
  const isLoggedIn = Boolean(getStoredAuth()?.token);

  return (
    <>
      <section className="landing-hero">
        <p className="landing-eyebrow">Personal finance, simplified</p>
        <h1>Know exactly where your money goes</h1>
        <p className="landing-lede">
          Track income and expenses, see your balance at a glance, and stay in control —
          all in one clean, fast dashboard.
        </p>

        <div className="landing-cta">
          {isLoggedIn ? (
            <Link to="/dashboard" className="btn-primary btn-lg">Go to your dashboard</Link>
          ) : (
            <>
              <Link to="/signup" className="btn-primary btn-lg">Get started free</Link>
              <Link to="/login" className="btn-outline btn-lg">Log in</Link>
            </>
          )}
        </div>
      </section>

      <section className="summary landing-preview" aria-hidden="true">
        <div className="summary-card summary-card--income">
          <span className="summary-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
            </svg>
          </span>
          <div>
            <h3>Income</h3>
            <p className="income-amount">$5,000.00</p>
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
            <p className="expense-amount">$2,370.00</p>
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
            <p className="balance-amount">$2,630.00</p>
          </div>
        </div>
      </section>

      <section className="landing-features">
        {FEATURES.map(feature => (
          <div className="feature-card" key={feature.title}>
            <span className="feature-icon" aria-hidden="true">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {!isLoggedIn && (
        <section className="card landing-closing">
          <h2>Ready to take control of your finances?</h2>
          <p className="subtitle">It only takes a minute to create an account.</p>
          <Link to="/signup" className="btn-primary btn-lg">Create your free account</Link>
        </section>
      )}
    </>
  );
}

export default Landing
