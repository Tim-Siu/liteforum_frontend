
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ol>
      {posts.map(post => (
        <div>
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>Tags: {post.tags.map(tag => tag.name).join(', ')}</p>
          <p>Users: {post.users.map(user => user.name).join(', ')}</p>
        </li>
        <Link to={`/posts/${post.id}`}>Show</Link>
        </div>
      ))}
    </ol>
  );
}

export default PostList;
