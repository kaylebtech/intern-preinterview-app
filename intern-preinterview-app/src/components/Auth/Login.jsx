import React, { useState } from "react";
import * as API from "../../api";

export default function Login({ onSwitch }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    try {
      setLoading(true);
      const user = await API.login(email, password);
      console.log("login success", user);

      
      localStorage.setItem("ks_user", JSON.stringify(user));

      onSwitch?.("dashboard");
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" role="main" aria-labelledby="loginTitle">
        <div className="auth-header">
          <h1 id="loginTitle">Welcome back</h1>
          <div className="auth-sub">Sign in to access your dashboard</div>
        </div>

        <form onSubmit={handleSubmit} aria-describedby="loginDesc">
          <label style={{ display: "block", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Email</span>
            <input className="input" name="email" type="email" required placeholder="you@domain.com" />
          </label>

          <label style={{ display: "block", marginTop: 12 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Password</span>
            <input className="input" name="password" type="password" required placeholder="••••••••" />
          </label>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <a className="small-link" href="#" onClick={(e) => { e.preventDefault(); onSwitch?.("signup"); }}>Create account</a>
          </div>

          {error && <div style={{ color: "salmon", marginTop: 12 }}>{error}</div>}

          <div style={{marginTop: 20}} className="form-foot" id="loginDesc">
            <span><label style={{ cursor: "pointer" }}><input type="checkbox" style={{ marginRight: 6 }} /> Remember me</label></span>
          </div>

          <div style={{marginTop:30}} className="forgotten Password">
            <a href="#" className="small-link"> Forgotten Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}