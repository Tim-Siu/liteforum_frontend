import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);



    const handleTagAdd = () => {
        setTags([...tags, tagInput]);
        setTagInput('');
    }



    // const handleUserAdd = () => {
    //     setUsers([...users, userInput]);
    //     setUserInput('');
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            console.log(response);
            navigate(`/posts/${response.data.id}`);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label"> Title</label>
                    <input type="text" className="form-control" id="titleInput" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="bodyInput" className="form-label">Body</label>

                    <textarea className="form-control" id="bodyInput" rows="3" value={body} onChange={(event) => setBody(event.target.value)}></textarea>
                    {/* <textarea value={body} onChange={(event) => setBody(event.target.value)} /> */}
                </div>
                {/* <label>
                    Tags:
                    <input type="text" value={tagInput} onChange={(event) => setTagInput(event.target.value)} />
                    <button type="button" onClick={handleTagAdd}>Add Tag</button>
                </label>
                {tags.map((tag) => (
                    <div key={tag}>{tag}</div>
                ))}
                <br /> */}
                <div className="mb-3">
                    <label htmlFor="tagInput" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tagInput" value={tagInput} onChange={(event) => setTagInput(event.target.value)} /><br />
                    <button type="button" className="btn btn-light" onClick={handleTagAdd}>Add Tag</button>
                    {tags.map((tag) => (<button type="button" key={tag} className="btn btn-outline-secondary" style={{ marginLeft: '5px' }}>{tag}</button>))}
                </div>

                {/* <label>
                    Users:
                    <input type="text" value={userInput} onChange={(event) => setUserInput(event.target.value)} />
                    <button type="button" onClick={handleUserAdd}>Add User</button>
                </label>
                {users.map((user) => (
                    <div key={user}>{user}</div>
                ))}
                <br /> */}
                {/* <div className="mb-3">
                    <label htmlFor="userInput" className="form-label">Arthurs</label>
                    <input type="text" className="form-control" id="userInput" value={userInput} onChange={(event) => setUserInput(event.target.value)} /><br />
                    <button type="button" className="btn btn-light" onClick={handleUserAdd}>Add Arthur</button>
                    {users.map((user) => (<button type="button" key={user} className="btn btn-outline-secondary" style={{ marginLeft: '5px' }}>{user}</button>))}
                </div> */}
                {/* <button type="submit">Submit</button> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default PostCreate;

