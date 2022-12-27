import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';

const TagList = () => {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://18.179.112.150/tags', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTags(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="list-group w-auto">
                {tags.map(tag => (
                    <Link to={`/tags/${tag.id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" key={tag.id}>
                        <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 className="mb-0">{tag.name}</h6>
                                <p className="mb-0 opacity-75">Post Count: {tag.post_count}</p>
                            </div>
                            <small className="opacity-50 text-nowrap">{moment(tag.created_at).fromNow()}</small>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TagList;