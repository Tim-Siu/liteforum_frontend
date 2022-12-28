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
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (!token || user_id != id) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://api.timxsy.com/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(result.data);
            setPosts(result.data.posts);
            setComments(result.data.comments);
        };
        fetchData();
    }, []);

    const handleDeletePost = async (id) => {
        await axios.delete(`https://api.timxsy.com/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
    };

    const handleDeleteComment = async (id) => {
        await axios.delete(`https://api.timxsy.com/comments/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const newComments = comments.filter((comment) => comment.id !== id);
        setComments(newComments);
    };

    const handleEditPost = (id) => {
        navigate(`/posts/${id}/edit`);
    };

    return (
        <div className="container">
            <div className="list-group w-auto">
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Profile</h6>
                        </div>
                    </div>
                </div>
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75">Name: {user.name}</p>
                            <p className="mb-0 opacity-75">Email: {user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75">Post Count: {(posts.length)}</p>
                            <p className="mb-0 opacity-75">Comment Count: {comments.length}</p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="list-group w-auto">
                    <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                        <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 className="mb-0">Posts</h6>
                            </div>
                        </div>
                    </div>
                    {posts.map(post => (
                        <>
                            <div to={`/posts/${post.id}`} key={post.id} className="list-group-item list-group-horizontal d-flex gap-3 py-3" aria-current="true">
                                {/* haven't figured out why the unique key error is still happening */}
                                <li className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0 opacity-75">{post.title}</h6>
                                    </div>
                                </li>
                                <li className="d-flex">
                                    <button className="btn btn-outline-secondary" style={{ marginLeft: '5px' }} onClick={() => handleEditPost(post.id)}>Edit</button>
                                    <button className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={() => handleDeletePost(post.id)}>Delete</button>
                                </li>
                            </div>
                        </>
                    ))}
                </div>
                <br />
                <div className="list-group w-auto">
                    <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                        <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 className="mb-0">Comments</h6>
                            </div>
                        </div>
                    </div>
                    {comments.map(comment => (
                        <div className="list-group-item list-group-horizontal d-flex gap-3 py-3 py-3" aria-current="true" key={comment.id}>
                            <li className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75">{comment.body}</p>
                                </div>
                            </li>
                            <li className="d-flex">
                                <button className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Profile;

