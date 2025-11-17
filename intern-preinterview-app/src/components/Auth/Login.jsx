import React from 'react';

export default function Login({onSwitch}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // simulate or call API
    console.log('login attempt');
    // for now auto-open dashboard for demo
    onSwitch?.('dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card" role="main" aria-labelledby="loginTitle">
        <div className="auth-header">
          <h1 id="loginTitle">Welcome back</h1>
          <div className="auth-sub">Sign in to access your dashboard</div>
        </div>

        <form onSubmit={handleSubmit} aria-describedby="loginDesc">
          <label style={{display:'block', marginBottom:8}}>
            <span style={{fontSize:13, color:'var(--muted)'}}>Email</span>
            <input className="input" name="email" type="email" required placeholder="you@domain.com"/>
          </label>

          <label style={{display:'block', marginTop:12}}>
            <span style={{fontSize:13, color:'var(--muted)'}}>Password</span>
            <input className="input" name="password" type="password" required placeholder="••••••••"/>
          </label>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14}}>
            <button className="btn btn-primary" type="submit">Sign in</button>
            <a className="small-link" href="#" onClick={(e)=>{e.preventDefault(); onSwitch?.('signup')}}>Create account</a>
          </div>

          <div className="form-foot" id="loginDesc">
            <span><label style={{cursor:'pointer'}}><input type="checkbox" style={{marginRight:6}}/> Remember me</label></span>
            <a href="#" className="small-link">Forgot?</a>
          </div>
        </form>
      </div>
    </div>
  );
}