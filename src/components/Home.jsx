import { useNavigate } from 'react-router';
import { useEffect } from 'react';
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/posts');
    }, []);
    return null;    
}

export default Home;