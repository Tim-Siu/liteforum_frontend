import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);



    const handleTagAdd = () => {
        if (tagInput === '') {
            return;
        } else {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title === '' || body === '') {
            return;
        } else {
            const postData = {
                post: {
                    title,
                    body,
                    tags,
                }
            }

            try {
                const response = await axios.post('http://localhost:3000/posts', postData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(response);
                navigate(`/posts/${response.data.id}`);

            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleClearTags = () => {
        setTags([]);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label"> Title</label>
                    <input type="text" className="form-control" id="titleInput" value={title} onChange={(event) => setTitle(event.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="bodyInput" className="form-label">Body</label>

                    <textarea className="form-control" id="bodyInput" rows="3" value={body} onChange={(event) => setBody(event.target.value)} required></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="tagInput" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tagInput" value={tagInput} onChange={(event) => setTagInput(event.target.value)} /><br />
                    <button type="button" className="btn btn-outline-primary" onClick={handleTagAdd} style={{ marginLeft: '0px', marginTop: '-12px' }} >Add Tag</button>
                    <button type="button" className="btn btn-outline-danger" onClick={handleClearTags} style={{ marginLeft: '5px', marginTop: '-12px' }}>Clear Tags</button><br />
                    {tags.map((tag) => (<button type="button" key={tag} className="btn btn-outline-secondary" style={{ marginRight: '5px', marginTop: '10px' }} >{tag}</button>))}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default PostCreate;

