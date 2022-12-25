
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(res => setPosts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <div className="list-group w-auto">
                {posts.map(post => (
                    <Link to={`/posts/${post.id}`} key={post.id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                        {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"> */}
                        <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 className="mb-0">{post.title}</h6>
                                <p className="mb-0 opacity-75">Tags: {post.tags.map(tag => tag.name).join(', ')}</p>
                                <p className="mb-0 opacity-75">Arthur: {post.user.name}</p>
                            </div>
                            <small className="opacity-50 text-nowrap">{moment(post.created_at).format('LLL')}</small>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PostList;
