import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostShow = (props) => {
    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);

    let { id } = useParams();
    console.log(id)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:3000/posts/${id}`);
            setPost(result.data);
            setTags(result.data.tags);
            setUsers(result.data.users);
        };
        fetchData();
    }, []);

    return(
    <div>
        <h2>{post.title}</h2>
        <p>Body: {post.body}</p>
        <p>Author: {users.map(user => (<span key={user.id}>{user.name};  </span>))}</p>
        <p>Topic: {tags.map(tag => (<span key={tag.id}>{tag.name};  </span>))}</p>
    </div>
    )
}


export default PostShow;