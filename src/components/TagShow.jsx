import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const TagShow = () => {
    const [tag, setTag] = useState({});
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    let { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://api.timxsy.com/tags/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTag(result.data);
            setPosts(result.data.posts);
        };
        // console.log(posts)
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="list-group w-auto">
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">{tag.name}</h6>
                            <p className="mb-0 opacity-75">Post Count: {posts.length}</p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="list-group w-auto">
                    {posts.map(post => (
                        <Link to={`/posts/${post.id}`} key={post.id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">{post.title}</h6>
                                    {/* <p className="mb-0 opacity-75">Author: {post.user}</p> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default TagShow;