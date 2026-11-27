import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      Admin: {
        username: "admin",
        password: "admin123",
      },
      Student: {
        username: "student",
        password: "student123",
      },
    };

    const user = credentials[role];

    if (username === user.username && password === user.password) {
      setError("");
      onLogin(role);
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">G</div>

        <h1>GateTrack</h1>
        <p className="login-subtitle">Visitor Management System</p>

        <form onSubmit={handleSubmit}>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError("");
            }}
          >
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
          </select>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;