import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaBook, FaFileAlt, FaVideo, FaPodcast, FaNewspaper } from 'react-icons/fa';

const Resources = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/resources')
            .then(response => response.json())
            .then(data => setResources(data))
            .catch(error => console.error('Error fetching resources:', error));
    }, []);

    const exampleFeatures = [
        {
            id: '1',
            title: 'Webinars',
            description: 'Explore insightful webinars on various mental health topics.',
            type: 'Webinar',
        },
        {
            id: '2',
            title: 'Books',
            description: 'Dive into a collection of mental health-related books.',
            type: 'Book',
        },
        {
            id: '3',
            title: 'Guides',
            description: 'Navigate through helpful guides for mental well-being.',
            type: 'Guide',
        },
        {
            id: '4',
            title: 'Videos',
            description: 'Watch videos covering different aspects of mental health.',
            type: 'Video',
        },
        {
            id: '5',
            title: 'Podcasts',
            description: 'Listen to engaging podcasts discussing mental health issues.',
            type: 'Podcast',
        },
        {
            id: '6',
            title: 'Articles',
            description: 'Read informative articles providing insights into mental health.',
            type: 'Article',
        },
    ];

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Explore Our Categories</h2>
            <div className="row">
                {(resources.length > 0 ? resources : exampleFeatures).map(feature => (
                    <div key={feature.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow">
                            <div className="card-body">
                                {feature.type === 'Webinar' && <FaPlayCircle size={40} className="mb-3 text-primary" />}
                                {feature.type === 'Book' && <FaBook size={40} className="mb-3 text-success" />}
                                {feature.type === 'Guide' && <FaFileAlt size={40} className="mb-3 text-info" />}
                                {feature.type === 'Video' && <FaVideo size={40} className="mb-3 text-warning" />}
                                {feature.type === 'Podcast' && <FaPodcast size={40} className="mb-3 text-danger" />}
                                {feature.type === 'Article' && <FaNewspaper size={40} className="mb-3 text-secondary" />}

                                <h3 className="card-title">{feature.title}</h3>
                                <p className="card-text">{feature.description}</p>
                                <Link to={`/${feature.type.toLowerCase()}s`} className="btn btn-primary">
                                    Explore {feature.type}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
