import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';


const PostList = () => {
    const [posts, setPosts] = useState([]);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        axios.get('https://api.timxsy.com/posts')
            .then(res => setPosts(res.data))
            .catch(err => console.error(err));
        // console.log(posts);
    }, []);

    useEffect(() => { console.log('Thanks for visiting!') }, []);

    const handleNewest = () => {
        const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPosts(sortedPosts);
    }

    const handleOldest = () => {
        const sortedPosts = [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setPosts(sortedPosts);
    }

    return (
        <div className="container">
            <div className='btn-group' role='group' aria-label="Basic outlined example" style={{marginTop: '-12px' }}>
                <button type="button" className="btn btn-outline-primary" onClick={handleNewest}>Newest</button>
                <button type="button" className="btn btn-outline-primary" onClick={handleOldest}>Oldest</button>
            </div>
            <div className="list-group w-auto">
                {!token && <div className='form-text' style={{marginBottom:"6px"}}>Login to view details.</div>}
                {token && <div className='form-text' style={{marginBottom:"6px"}}>Only showing the latest 12 posts.</div>}
                {posts.map(post => (
                    <Link to={`/posts/${post.id}`} key={post.id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                        {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"> */}
                        <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 className="mb-0">{post.title}</h6>
                                <p className="mb-0 opacity-75">Tags: {post.tags.map(tag => tag.name).join(', ')}</p>
                                <p className="mb-0 opacity-75">Author: {post.user.name}</p>
                            </div>
                            <small className="opacity-50 text-nowrap">{moment(post.created_at).fromNow()}</small>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PostList;
