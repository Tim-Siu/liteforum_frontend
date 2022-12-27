import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
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
        // console.log(res.data)
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
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <div id="emailHelp" className="form-text">The email that you signed up with.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <div id="submitHelp" className="form-text">{error && <p>{error}</p>}</div>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" readOnly checked/>
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>

      </form>

    </div>

  );
};

export default Login;
