import React from 'react';




export default function Dashboard(){
  return (
    <div className="df-shell">
      <div className='content-wrap'>
        <aside className="df-sidebar">
            <div className="brand">
            <div className="logo">K</div>
            <div className="brand-name">KoinSave</div>
            </div>

        <nav className="nav-list">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Report</button>
          <button className="nav-item">Scan</button>
          <button className="nav-item">Message <span className="badge">3</span></button>
          <button className="nav-item">Profile</button>
          <button className="nav-item">Settings</button>
        </nav>

        <div className="sidebar-footer">v0.1</div>
      </aside>

      <main className="df-main">
        <header className="df-topbar">
          <div>
            <h1 className="hello">Hello <span>Stella</span></h1>
            <div className="sub">Welcome back</div>
          </div>
          <div className="top-actions">
            <div className="notif">🔔 <span className="notif-count">3</span></div>
            <div className="avatar">RK</div>
          </div>
        </header>

        <section className="df-grid">
          <div className="left-col">
            <div className="quick-actions">
              <button className="circle">Send</button>
              <button className="circle">Receive</button>
              <button className="circle">F&F</button>
              <button className="circle">Bill</button>
              <button className="circle">Grocery</button>
              <button className="circle">Ticket</button>
            </div>

            <div className='account-balance'>
               <h3>$20,000</h3>
            </div>

            <div className="promo card">
              <div className="promo-left">🔥 Hot Offer</div>
              <div className="promo-right">Refer a Friend to Get Free Card Shipping!</div>
            </div>

            <div className="transactions card">
              <div className="card-head">
                <h3>Transactions</h3>
                <a className="see-all">See all</a>
              </div>

              <ul className="tx-list">
                <li><strong>Figma</strong><span>$144</span><div className="muted">30 June, 2024 • Visa Card</div></li>
                <li><strong>Sketch</strong><span>-$138</span><div className="muted">27 June, 2024 • Paypal</div></li>
                <li><strong>Design Sprint</strong><span>$54</span><div className="muted">20 June, 2024 • Card</div></li>
                <li><strong>Figma</strong><span>$144</span><div className="muted">30 June, 2024 • Visa Card</div></li>
                <li><strong>Sketch</strong><span>-$138</span><div className="muted">27 June, 2024 • Paypal</div></li>
                <li><strong>Design Sprint</strong><span>$54</span><div className="muted">20 June, 2024 • Card</div></li>
              </ul>
            </div>
          </div>

          <aside className="right-col">
            <div className="big-card card">
              <div className="chip"></div>
              <div className="amount">$20,340.98</div>
              <div className="owner">Rakib Kowshar</div>
              <div className="expiry">Exp: 06/26</div>
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
              <div className="chart-placeholder">[ Chart ]</div>
            </div>
          </aside>
        </section>
        </main>
      </div>
    </div>
  );
}