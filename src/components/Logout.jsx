import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('jwt');
        navigate('/');
    }, []);
    return null;
}

export default Logout;