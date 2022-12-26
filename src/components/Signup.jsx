import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username, email, password, password2 } = formData;

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        if (username === '') {
            console.error("Username is required");
            setError("Username is required");
        } else if (email === '') {
            console.error("Email is required");
            setError("Email is required");
        } else if (password === '') {
            console.error("Password is required");
            setError("Password is required");
        } else {
            if (password !== password2) {
                console.error("Passwords don't match");
                setError("Passwords don't match");
            } else {
                try {
                    const newUser = {
                        user: {
                            name: username,
                            email: email,
                            password: password
                        }
                    };
                    console.log(newUser);

                    const res = await axios.post('http://localhost:3000/users', newUser);
                    console.log(res);
                    if (res.data.token) {
                        localStorage.setItem('user_id', res.data.user_id);
                        localStorage.setItem('username', res.data.name);
                        localStorage.setItem('token', res.data.token);
                        dispatch({
                            type: 'LOGIN',
                            token: res.data.token,
                            user_id: res.data.user_id,
                            username: res.data.name
                        })
                    }
                    navigate('/posts')
                } catch (err) {
                    console.error(err.response.data);
                    setError(err.response.data);
                }
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                    <div id="paawordHelp" className="form-text">Min length of 6 required.</div>

                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                    <div id="submitHelp" className="form-text">{error && <p>{error}</p>}</div>

                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
