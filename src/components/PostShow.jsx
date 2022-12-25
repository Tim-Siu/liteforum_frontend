import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

        <div className="card">
            <div className="row">
                <h2 className="col">{post.title}</h2>
            </div>
            <div className="row">
                <p className="col">Body: {post.body}</p>
            </div>
            <div className="row">
                <p className="col">Author: {user.name}</p>
            </div>
            <div className="row">
                <p className="col">Topic: {tags.map(tag => (<span key={tag.id}>{tag.name};  </span>))}</p>
            </div>
            <div className="row">
                <p className="col">Comments: {comments.map(comment => (<span key={comment.id}>{comment.body};  </span>))}</p>
            </div>
        </div>
        </div>

    )
}


export default PostShow;