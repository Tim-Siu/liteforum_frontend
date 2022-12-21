import React, { useState } from 'react';
import axios from 'axios';

function PostCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [userInput, setUserInput] = useState('');

    const handleTagAdd = () => {
        setTags([...tags, tagInput]);
        setTagInput('');
    }

    const handleUserAdd = () => {
        setUsers([...users, userInput]);
        setUserInput('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postData = {
            post: {
                title,
                body,
                tags,
                users
            }
        }

        try {
            const response = await axios.post('http://localhost:3000/posts', postData);
            console.log(response);
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <br />
            <label>
                Body:
                <textarea value={body} onChange={(event) => setBody(event.target.value)} />
            </label>
            <br />
            <label>
                Tags:
                <input type="text" value={tagInput} onChange={(event) => setTagInput(event.target.value)} />
                <button type="button" onClick={handleTagAdd}>Add Tag</button>
            </label>
            {tags.map((tag) => (
                <div key={tag}>{tag}</div>
            ))}
            <br />
            <label>
                Users:
                <input type="text" value={userInput} onChange={(event) => setUserInput(event.target.value)} />
                <button type="button" onClick={handleUserAdd}>Add User</button>
            </label>
            {users.map((user) => (
                <div key={user}>{user}</div>
            ))}
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default PostCreate;

