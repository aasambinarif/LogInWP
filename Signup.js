import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      setMessage(res.data.message);
      setTimeout(() => navigate("/success"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Create Account</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        <p>{message}</p>
        <p>Already have an account? <a href="/">Login</a></p>
      </form>
    </div>
  );
}