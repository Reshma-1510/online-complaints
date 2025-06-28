import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setRole }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setRole(res.data.role);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
