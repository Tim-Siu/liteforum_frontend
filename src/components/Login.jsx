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
    <div className='container'>

      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" class="form-text">The email that you signed up with.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div id="submitHelp" class="form-text">{error && <p>{error}</p>}</div>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" diabled checked />
          <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>

      </form>

    </div>

  );
};

export default Login;
