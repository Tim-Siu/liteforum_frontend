import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const CommentCreate = ({ postId }) => {
    const [body, setBody] = useState('');
    const token = useSelector((state) => state.token);
    const user_id = useSelector((state) => state.user_id);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (body === '') {
            return;
        } else {

            const commentData = {
                comment: {
                    body: body,
                    user_id: user_id,
                    post_id: postId
                }
            };

            try {
                await axios.post('http://localhost:3000/comments', commentData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBody('');
            }
            catch (error) {
                // console.error(error);
            }
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <br />
                    <textarea
                        className="form-control"
                        id="body"
                        rows="3"
                        value={body}
                        onChange={(e) => setBody(e.target.value)} required
                    ></textarea>
                    <div id="commentHelp" className="form-text">Refresh the page to see your comments.</div>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );


}

export default CommentCreate;