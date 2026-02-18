import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      setEmail("");
      setPassword("");

      alert("Login successful!");
      window.location.href = "/products";
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <div className="auth-fields">
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-footer">
          New user?{" "}
          <Link to="/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

