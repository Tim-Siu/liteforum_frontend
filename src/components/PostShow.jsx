import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const PostShow = () => {
    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    let { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:3000/posts/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setPost(result.data);
            setTags(result.data.tags);
            setComments(result.data.comments);
            setUser(result.data.user);
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="list-group w-auto">
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">{post.title}</h6>
                            <p className="mb-0 opacity-75">Author: {user.name}</p>
                        </div>
                    </div>
                </div>
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Body</h6>
                            <p className="mb-0 opacity-75">{post.body}</p>
                        </div>
                    </div>
                </div>
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Topic</h6> 
                            <br/>
                            {tags.map((tag) => (<Link to={`/tags/${tag.id}`} key={tag.id}>
                                <button type="button" key={tag} className="btn btn-outline-secondary" style={{ marginLeft: '5px' }}>{tag.name}</button>
                                </Link>))}
                        </div>
                    </div>
                </div>
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Comments</h6>
                            <p className="mb-0 opacity-75">{comments.map(comment => (<span key={comment.id}>{comment.body};  </span>))}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}


export default PostShow;