import React, { useState } from 'react';
import * as API from '../../api';

export default function Signup({onSwitch}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(e.target);
    const fullName = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const confirm = form.get('confirmPassword'); 

    if (password !== confirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const user = await API.signup({ fullName, email, password });
      console.log('created user', user);
      
      onSwitch?.('dashboard');
    } catch (err) {
      
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
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
            <input className="input" name="confirmPassword" type="password" required placeholder="Confirm password"/>
          </label>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14}}>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creating…' : 'Create account'}
            </button>
            <a className="small-link" href="#" onClick={(e)=>{e.preventDefault(); onSwitch?.('login')}}>Sign in</a>
          </div>

          {error && <div style={{color:'#ff6b6b', marginTop:12}}>{error}</div>}
        </form>
      </div>
    </div>
  );
}