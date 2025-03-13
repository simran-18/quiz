import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { handleLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(!(email && password)); // Disable button when fields are empty
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      setLoading(true);
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));      
      alert("Login successful! Redirecting...");
      handleLoggedIn();
      navigate("/quiz");
     
    } catch (error) {
      alert("Login failed! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="divider">Login Form</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <button type="submit" disabled={disabled || loading}>
        {loading ? "Logging in..." : "Submit"}
      </button>

      <p className="signup-link">
        New user? <Link to="/signup">Sign up here</Link>
      </p>
    </form>
  );
};

export default Login;
