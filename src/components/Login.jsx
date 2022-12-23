import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:3000/login', { email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.data.token);
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('username', res.data.name);
        // Redirect to home page or another protected route
        navigate(-1);

      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
