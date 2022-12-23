import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const navigate = useNavigate();

    const { username, email, password, password2 } = formData;

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.error("Passwords don't match");
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
                    localStorage.setItem('jwt', res.data.token);
                }
                navigate(-1)
            } catch (err) {
                console.error(err.response.data);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                    minLength="6"
                />
            </div>
            <div>
                <label htmlFor="password2">Confirm Password</label>
                <input
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                    required
                    minLength="6"
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
