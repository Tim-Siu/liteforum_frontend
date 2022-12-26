import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const token = useSelector(state => state.token);
    const user_id = useSelector(state => state.user_id);


    return (

        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link to="/posts" className="nav-link px-2 link-dark">Post</Link></li>
                    <li><Link to="/tags" className="nav-link px-2 link-dark">Tag</Link></li>
                    <li><Link to="/posts/new" className="nav-link px-2 link-dark">CreatePost</Link></li>
                    <li><Link to="/about" className="nav-link px-2 link-dark">About</Link></li>
                </ul>

                <div className="col-md-3 text-end">
                    {token ? (
                        <Link to="/logout">
                            <button type="button" className="btn btn-outline-primary me-2">Logout</button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="btn btn-outline-primary me-2">Login</button>
                        </Link>
                    )}
                    {/* <Link to="/Signup">
                        <button type="button" className="btn btn-primary">Sign-up</button>
                    </Link> */}
                    {token ? (
                        <Link to={{pathname: `/users/${user_id}`}}>
                            <button type="button" className="btn btn-primary">Profile</button>
                        </Link>
                    ) : (
                        <Link to="/signup">
                            <button type="button" className="btn btn-primary">Sign-up</button>
                        </Link>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header;