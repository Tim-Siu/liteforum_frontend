import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const CommentCreate = ({ postId }) => {
    const [body, setBody] = useState('');
    const token = useSelector((state) => state.token);
    const userid = useSelector((state) => state.userid);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const commentData = {
            comment: {
                body: body,
                user_id: userid,
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
            console.log(error);
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <br/>
                    <textarea
                        className="form-control"
                        id="body"
                        rows="3"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );


}

export default CommentCreate;