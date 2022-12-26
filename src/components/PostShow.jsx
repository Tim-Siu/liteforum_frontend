import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import CommentCreate from './CommentCreate';
import moment from 'moment';

const PostShow = () => {
    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const user_id = useSelector((state) => state.user_id);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

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
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">{post.title}</h6>
                            <br />
                            <p className="mb-0 opacity-75">Author: {user.name}</p>
                        </div>
                        <small className="opacity-50 text-nowrap">{moment(post.created_at).startOf('hour').fromNow()}</small>
                    </div>
                </div>
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            {/* <h6 className="mb-0">Body</h6>
                            <br /> */}
                            <p className="mb-0 opacity-75">{post.body}</p>
                        </div>
                    </div>
                </div>
                {tags !== [] &&
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            {/* <h6 className="mb-0">Topic</h6>
                            <br /> */}
                            {tags.map((tag) => (<Link to={`/tags/${tag.id}`} key={tag.id}>
                                <button type="button" key={tag} className="btn btn-outline-secondary" style={{ marginLeft: '5px' }}>{tag.name}</button>
                            </Link>))}
                        </div>
                    </div>
                </div>
                }
            </div>
            <br />
            <div className="list-group w-auto">
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Comments</h6>
                            <br />
                            <ul className="list-group list-group-flush">
                                {comments.map(comment => (<li key={comment.id} className="list-group-item"><div className="mb-0 opacity-75"><strong>{comment.user.name}:</strong> {comment.body} </div> </li>))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Set Comment</h6>

                            {token && <CommentCreate postId={id} />}
                        </div>
                    </div>
                </div>
            </div>

        </div>




    )
}


export default PostShow;