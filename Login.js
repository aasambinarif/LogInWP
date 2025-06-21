import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          withCredentials: true, // ✅ This line is the fix!
        }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/success"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      console.error("Login error:", err);
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Login</h2>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>{message}</p>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
}