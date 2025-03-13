import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(!(name && email && password)); // Disables button only if any field is empty
  }, [name, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      setLoading(true);
      // Simulate SingUp API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Signup successful! Redirecting to login screen...");
      navigate("/");
    } catch (error) {
      alert("Signup failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="divider">Signup Form</h1>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
      />

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
        placeholder="Create a password"
      />
       <p className="login-link">
        Already have an account? <Link to="/">Login here</Link>
      </p>
     
      <button type="submit" disabled={disabled || loading}>
        {loading ? "Signing Up..." : "Submit"}
      </button>
    </form>
  );
};

export default SignUp;
