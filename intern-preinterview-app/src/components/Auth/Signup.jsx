import React from 'react';

export default function Signup({onSwitch}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('signup');
    onSwitch?.('dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card" role="main" aria-labelledby="signupTitle">
        <div className="auth-header">
          <h1 id="signupTitle">Create account</h1>
          <div className="auth-sub">Start building your profile — it’s quick.</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{display:'block', marginBottom:8}}>
            <span style={{fontSize:13, color:'var(--muted)'}}>Full name</span>
            <input className="input" name="name" type="text" required placeholder="Enter your full name"/>
          </label>

          <label style={{display:'block', marginTop:12}}>
            <span style={{fontSize:13, color:'var(--muted)'}}>Email</span>
            <input className="input" name="email" type="email" required placeholder="you@domain.com"/>
          </label>

          <label style={{display:'block', marginTop:12}}>
            <span style={{fontSize:13, color:'var(--muted)'}}>Password</span>
            <input className="input" name="password" type="password" required placeholder="strong password"/>
          </label>

          <label style={{display:'block', marginTop:12}}>
            <span style={{fontSize:13, color:'var(--muted)'}}>Confirm Password</span>
            <input className="input" name="password" type="password" required placeholder="strong password"/>
          </label>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14}}>
            <button className="btn btn-primary" type="submit">Create account</button>
            <a className="small-link" href="#" onClick={(e)=>{e.preventDefault(); onSwitch?.('login')}}>Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}