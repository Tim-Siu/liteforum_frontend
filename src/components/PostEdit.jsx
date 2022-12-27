import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostEdit = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const user_id = useSelector((state) => state.user_id);
    const { id } = useParams();

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

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://18.179.112.150/posts/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTitle(result.data.title);
            setBody(result.data.body);
            setTags(result.data.tags.map((tag) => tag.name));
            if (result.data.user.id != user_id) {
                // console.log(result.data.user.id)
                // console.log(user_id)
                // console.log(user_id == result.data.user.id)
                //encoutered a bug where the user_id is a string and the result.data.user.id is a number, maybe it is time to switch to typescript
                navigate(`/posts/${id}`);
            }
        };
        fetchData();
    }, []);

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
                const response = await axios.put(`http://18.179.112.150/posts/${id}`, postData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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

    const handleClearBody = () => {
        setBody('');
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label"> Title</label>
                    <input type="text" className="form-control" id="titleInput" value={title} onChange={(event) => setTitle(event.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="bodyInput" className="form-label">Body</label>
                    <textarea className="form-control" id="bodyInput" rows="3" value={body} onChange={(event) => setBody(event.target.value)} required></textarea>
                    <button type="button" className="btn btn-outline-danger" onClick={handleClearBody} style={{ marginLeft: '0px', marginTop: '10px' }}>Clear Body</button>
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

export default PostEdit;
