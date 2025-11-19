import React, { useEffect, useState } from 'react';
import { getUser, getTransactions, sendMoney } from '../../api'; 

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ks_user')); } catch(_) { return null; }
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);


  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!user) {
        setErr("No user found — please login");
        setLoading(false);
        return;
      }

      setLoading(true);
      setErr("");
      try {
        
        const freshUser = await getUser(user.id);
        if (!mounted) return;
        setUser(freshUser);
        localStorage.setItem('ks_user', JSON.stringify(freshUser));

        
        const txs = await getTransactions(freshUser.id);
        if (!mounted) return;
        setTransactions(Array.isArray(txs) ? txs : []);
      } catch (e) {
        setErr((e && e.message) || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };

  }, []);


  async function handleSendMoney(amount, to, category = 'transfer', description = '') {
    if (!user) return setErr("No user");
    const parsed = Number(amount);
    if (!parsed || Number.isNaN(parsed) || parsed <= 0) {
      return setErr("Invalid amount");
    }

    setSending(true);
    setErr("");
    try {
      const tx = await sendMoney({ userId: user.id, amount: parsed, category, description });
      // update UI: prepend new tx and adjust balance
      setTransactions(prev => [tx, ...prev]);
      setUser(prev => {
        const updated = { ...prev, balance: Number(prev.balance) - Number(parsed) };
        localStorage.setItem('ks_user', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      setErr((e && e.message) || "Transfer failed");
    } finally {
      setSending(false);
    }
  }

  // basic logout
  function logout() {
    localStorage.removeItem('ks_user');
    onLogout?.();
  }

  if (loading) return <div className="card">Loading dashboard...</div>;
  if (err && !user) return (
    <div className="card">
      <div style={{color:'salmon'}}>{err}</div>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );

  return (
    <div style={{padding: 12}} className="df-main">
      <header className="df-topbar">
        <div>
          <h1 className="hello">Hello <span>{user?.fullName || 'User'}</span></h1>
          <div className="sub">Welcome back</div>
        </div>

        <div style={{display:'flex', padding: 12,  alignItems:'center', gap: 12 }}>
          <div style={{textAlign:'right'}}>
            <div style={{fontWeight:900, fontSize:20,  color:'var(--accent)'}}>
              ${Number(user?.balance || 0).toLocaleString()}
            </div>
            <div className="muted">Available balance</div>
          </div>
        </div>
      </header>

      <section className="df-grid">
        <div className="left-col">
          <div className="card quick-actions">
            <button
              className="circle"
              onClick={() => {
                const raw = prompt("Amount to send");
                const amount = Number(raw);
                if (raw === null) return; 
                if (Number.isNaN(amount) || amount <= 0) return alert("Please enter a valid amount.");
                const to = prompt("Recipient (just note):");
                if (to === null) return; 
                handleSendMoney(amount, to, 'transfer', `To ${to}`);
              }}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>

            <button className="circle">Receive</button>
            <button className="circle">F&F</button>
            <button className="circle">Bill</button>
            <button className="circle">Grocery</button>
            <button className="circle">Ticket</button>
          </div>

          <div className="promo card">
            <div className="promo-left"> Hot Offer</div>
            <div className="promo-right">Refer a Friend to Get Free Card Shipping!</div>
          </div>

          <div className="transactions card">
            <div className="card-head">
              <h3>Transactions</h3>
            </div>

            {transactions.length === 0 ? (
              <div className="muted">No transactions yet</div>
            ) : (
              <ul className="tx-list">
                {transactions.map(tx => (
                  <li key={tx.id}>
                    <strong style={{display:'flex', justifyContent:'space-between', gap:12}}>
                      <span>{tx.description || tx.category || '—'}</span>
                      <span style={{color: Number(tx.amount) < 0 ? '#ff8b8b' : '#b7f350'}}>
                        {Number(tx.amount) < 0 ? '-' : '+'}${Math.abs(Number(tx.amount || 0)).toLocaleString()}
                      </span>
                    </strong>
                    <div className="muted">{tx?.date ? new Date(tx.date).toLocaleString() : '—'}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="right-col">
          <div className="big-card card">
            <div className="amount">${Number(user?.balance || 0).toLocaleString()}</div>
            <div className="owner">{user?.fullName}</div>
            <div className="expiry muted">Demo account</div>
          </div>

          <div className="mini-row">
            <div className="card small">
              <div className="tab">
                <button className="tab-btn active">Expenses</button>
                <button className="tab-btn">Income</button>
              </div>
              <div className="value">$2,468</div>
              <div className="muted small">+2% vs last month</div>
            </div>

            <div className="card small">
              <div className="title">Integrations</div>
              <div className="muted small">API connected</div>
            </div>
          </div>

          <div className="chart card">
            <div className="muted small">Monthly</div>
            <div className="chart-placeholder">[ Chart]</div>
          </div>
        </aside>
      </section>
      
    </div>
  );
}