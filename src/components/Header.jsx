import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const image = require ('../img/logo192.png');

const Header = () => {
    const token = useSelector(state => state.token);
    const user_id = useSelector(state => state.user_id);

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/#/about" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="liteForum"><use xlinkHref={image} /></svg> */}
                    <img src={image} alt="liteForum" width="40" height="32" />
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    {/* <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li> */}
                    <li><Link to="/posts" className="nav-link px-2 link-dark">Posts</Link></li>
                    <li><Link to="/tags" className="nav-link px-2 link-dark">Tags</Link></li>
                    <li><Link to="/posts/new" className="nav-link px-2 link-dark">Create</Link></li>
                    <li><Link to="/about" className="nav-link px-2 link-secondary">About</Link></li>
                </ul>

                <div className="col-md-3 text-end">
                    {token ? (
                        <Link to="/logout">
                            <button type="button" className="btn btn-outline-secondary me-2">Logout</button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="btn btn-outline-primary me-2">Login</button>
                        </Link>
                    )}
                    {token ? (
                        <Link to={{ pathname: `/users/${user_id}` }}>
                            <button type="button" className="btn btn-outline-primary">MyProfile</button>
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