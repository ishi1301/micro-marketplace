import { useState } from "react";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        alert("Please fill in name, email and password.");
        return;
      }

      await API.post("/auth/register", { name, email, password });

      setName("");
      setEmail("");
      setPassword("");

      alert("Registered successfully");
      window.location.href = "/";
    } catch (err) {
      alert(err?.response?.data?.error || err?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>

        <div className="auth-fields">
          <input
            className="auth-input"
            placeholder="Name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}
