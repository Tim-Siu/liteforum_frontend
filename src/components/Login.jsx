import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import store from '../store';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:3000/login', { email, password })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('username', res.data.name);
        dispatch({
          type: 'LOGIN',
          token: res.data.token,
          user_id: res.data.user_id,
          username: res.data.name
        })

        // Redirect to home page or another protected route
        navigate('/posts');

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
