import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const token = useSelector((state) => state.token);
    const user_id = useSelector((state) => state.user_id);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!token || user_id != id) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:3000/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(result.data);
        };
        fetchData();
    }, []);

    return (
        <p>test</p>
    );
};

export default Profile;
        