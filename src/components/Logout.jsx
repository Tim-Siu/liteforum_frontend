import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch({
            type: 'LOGOUT',
            token: null,
            user_id: null,
            username: null
        })
    }, []);
    navigate('/posts');
    return null;
}

export default Logout;